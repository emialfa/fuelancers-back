import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { SignIn, DTOSignUp, AuthGoogle } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ResponseError } from 'src/common/responses/responses';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, User } from '../user/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signIn(dto: SignIn) {
    try {
      // find the user by email
      const user = await this.userModel.findOne({ email: dto.email });
      // const user = await this.findUser(dto.email);

      // if the user does not exist throw error
      if (!user) return ResponseError('Credentials incorrect', HttpStatus.FORBIDDEN);

      // compare password
      const pwMatches = await argon.verify(user.hash, dto.password);

      // invalid password
      if (!pwMatches) return ResponseError('Credentials incorrect', HttpStatus.FORBIDDEN);

      // return user
      delete user.hash;

      // return token generated
      return this.signToken(user.id, user.email, dto.keep_session);
    } catch (error) {
      console.log(error);
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async signUp(dto: DTOSignUp) {
    // hash password
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.userModel.create({
        email: dto.email,
        hash,
        firstName: dto.first_name,
        lastName: dto.last_name,
        phone: dto.phone,
      });
      // object new user
      // const user = await this.prisma.user.create({
      //   data: {
      //     email: dto.email,
      //     hash,
      //     first_name: dto.first_name,
      //     last_name: dto.last_name,
      //     phone: dto.phone,
      //     profile: {
      //       create: {},
      //     },
      //   },
      // });

      // return user
      delete user.hash;

      return this.signToken(user.id, user.email, false);
    } catch (error) {
      console.log(error);
      // if exist email throw error
      if (error.code === 'P2002') {
        throw new ForbiddenException('Credentials taken');
      }
    }
  }

  async signUpAsTechnician(dto: DTOSignUp) {
    // hash password
    const hash = await argon.hash(dto.password);
    try {
      // find the user by email
      const find_user = await this.findUser(dto.email);

      // if the user does not exist throw error
      if (find_user) return ResponseError('Credentials taken', HttpStatus.FORBIDDEN);
      // object new user
      const user = await this.userModel.create({
        email: dto.email,
        hash,
        firstName: dto.first_name,
        lastName: dto.last_name,
        phone: dto.phone,
        role: Role.TECHNICIAN,
      });
      // const user = await this.prisma.user.create({
      //   data: {
      //     email: dto.email,
      //     hash,
      //     first_name: dto.first_name,
      //     last_name: dto.last_name,
      //     phone: dto.phone,
      //     role: 'EXPERT',
      //     profile: {
      //       create: {},
      //     },
      //     expert: {
      //       create: {},
      //     },
      //   },
      // });
      // return user
      delete user.hash;

      return this.signToken(user.id, user.email, false);
    } catch (error) {
      console.log(error);
      // if exist email throw error
      if (error.code === 'P2002') {
        return ResponseError('Credentials taken', HttpStatus.FORBIDDEN);
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
      const user = await this.userModel.create({
        email: dto.email,
        hash: '',
        first_name: dto.firstName,
        last_name: dto.lastName,
        phone: 0,
        profile: {
          create: {},
        },
      });
      // const user = await this.prisma.user.create({
      //   data: {
      //     email: dto.email,
      //     hash: '',
      //     first_name: dto.firstName,
      //     last_name: dto.lastName,
      //     phone: 0,
      //     profile: {
      //       create: {},
      //     },
      //   },
      // });

      return this.signToken(user.id, user.email, true);
    }
  }

  // function to find a unique user
  async findUser(email: string) {
    // find the user by email
    const user = await this.userModel.findOne({ email });

    // const user = await this.prisma.user.findUnique({
    //   where: {
    //     email: email,
    //   },
    // });
    return user;
  }
}
