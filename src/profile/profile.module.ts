import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.model';
import { Degree, DegreeSchema } from '../generics/models/degree.model';
import { Service, ServiceSchema } from '../generics/models/service.model';
import { Portfolio, PortfolioSchema } from '../generics/models/portfolio.model';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Degree.name, schema: DegreeSchema },
      { name: Service.name, schema: ServiceSchema },
      { name: Portfolio.name, schema: PortfolioSchema },
    ]),
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
