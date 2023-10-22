import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../user/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('TOKEN_KEY'),
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.userModel.findById(payload.sub);
    // await this.prisma.user.findUnique({
    //   where: {
    //     id: payload.sub,
    //   },
    // });

    delete user.hash;
    return user;
  }
}
