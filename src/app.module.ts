import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// modules
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ExpertModule } from './expert/expert.module';
import { GenericsModule } from './generics/generics.module';
// middleware technician
// import { CheckerExpertMiddleware } from './common/middlewares/checkerExpert.middleware';
// import { ExpertController } from './expert/expert.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    UserModule,
    ExpertModule,
    ProfileModule,
    GenericsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(CheckerExpertMiddleware)
    //   .exclude(
    //     { path: '/api/v1/experts/:id', method: RequestMethod.GET },
    //     { path: '/api/v1/experts/*', method: RequestMethod.GET },
    //   )
    //   .forRoutes(ExpertController);
  }
}
