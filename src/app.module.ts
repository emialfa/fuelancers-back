import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// modules
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ExpertModule } from './expert/expert.module';
import { GenericsModule } from './generics/generics.module';
// middleware technician
import { CheckerExpertMiddleware } from './common/middlewares/checkerExpert.middleware';
import { ExpertController } from './expert/expert.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    UserModule,
    ExpertModule,
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
