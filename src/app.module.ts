import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// modules
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TechnicianModule } from './technician/technician.module';
// middleware technician
import { CheckerTechnicianMiddleware } from './common/middlewares/checkerTechnician.middleware';
import { TechnicianController } from './technician/technician.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    UserModule,
    TechnicianModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckerTechnicianMiddleware)
      .exclude({ path: 'api/v1/technician/:id', method: RequestMethod.GET })
      .forRoutes(TechnicianController);
  }
}
