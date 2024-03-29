import { Module } from '@nestjs/common';
import { ExpertService } from './expert.service';
import { ExpertController } from './expert.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.model';
import { Degree, DegreeSchema } from '../generics/models/degree.model';
import { Service, ServiceSchema } from '../generics/models/service.model';
import { Portfolio, PortfolioSchema } from '../generics/models/portfolio.model';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Degree.name, schema: DegreeSchema },
      { name: Service.name, schema: ServiceSchema },
      { name: Portfolio.name, schema: PortfolioSchema },
    ]),
  ],
  providers: [ExpertService],
  controllers: [ExpertController],
})
export class ExpertModule {}
