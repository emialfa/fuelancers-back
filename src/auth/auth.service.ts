import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignIn, SignUp, AuthGoogle } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signIn(dto: SignIn) {
    // find the user by email
    const user = await this.findUser(dto.email);

    // if the user does not exist throw error
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // compare password
    const pwMatches = await argon.verify(user.hash, dto.password);

    // invalid password
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    // return user
    delete user.hash;

    // return token generated
    return this.signToken(user.id, user.email, dto.keep_session);
  }

  async signUp(dto: SignUp) {
    // hash password
    const hash = await argon.hash(dto.password);

    try {
      // object new user
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
          phone: dto.phone,
          profile: {
            create: {},
          },
        },
      });

      // return user
      delete user.hash;

      return this.signToken(user.id, user.email, false);
    } catch (error) {
      // if exist email throw error
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
    }
  }

  async signUpAsTechnician(dto: SignUp) {
    // hash password
    const hash = await argon.hash(dto.password);
    try {
      // object new user
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
          phone: dto.phone,
          role: 'TECHNICIAN',
          profile: {
            create: {},
          },
          technician: {
            create: {},
          },
        },
      });
      // return user
      delete user.hash;

      return this.signToken(user.id, user.email, false);
    } catch (error) {
      // if exist email throw error
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
    }
  }

  // generate access token

  async signToken(
    userId: number,
    email: string,
    keep_session: boolean,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('TOKEN_KEY');
    let expiresIn: number;

    // check if keep session logged
    if (keep_session) {
      const validateForThreeMonths = 7890000000; // miliseconds

      expiresIn = new Date(Date.now() + validateForThreeMonths).getTime();
    } else {
      const validateForOneDay = 86400000; // miliseconds

      expiresIn = new Date(Date.now() + validateForOneDay).getTime();
    }

    const token = await this.jwt.signAsync(payload, {
      expiresIn: expiresIn,
      secret,
    });
    console.log(token);
    return {
      access_token: token,
    };
  }

  async signInWithGoogle(dto: AuthGoogle) {
    // find user if exist
    const userAuth = await this.findUser(dto.email);

    // if user exist, sign in with his data
    if (userAuth) {
      // return access token
      return this.signToken(userAuth.id, userAuth.email, true);
    } else {
      // else create new user without password
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: '',
          firstName: dto.firstName,
          lastName: dto.lastName,
          phone: 0,
          profile: {
            create: {},
          },
        },
      });

      return this.signToken(user.id, user.email, true);
    }
  }

  // function to find a unique user
  async findUser(email: string) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }
}
