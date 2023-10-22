import { Module } from '@nestjs/common';
import { GenericsService } from './generics.service';
import { GenericsController } from './generics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './models/category.model';
import { Degree, DegreeSchema } from './models/degree.model';
import { Experience, ExperienceSchema } from './models/experience.mode';
import { Language, LanguageSchema } from './models/language.model';
import { Location, LocationSchema } from './models/location.model';
import { Portfolio, PortfolioSchema } from './models/portfolio.model';
import { ProficiencyLanguage, ProficiencyLanguageSchema } from './models/proficiencyLanguage.model';
import { Service, ServiceSchema } from './models/service.model';
import { Skill, SkillSchema } from './models/skill.model';
import { Status, StatusSchema } from './models/status.model';
import { Workmode, WorkmodeSchema } from './models/workmode.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Degree.name, schema: DegreeSchema },
      { name: Experience.name, schema: ExperienceSchema },
      { name: Language.name, schema: LanguageSchema },
      { name: Location.name, schema: LocationSchema },
      { name: Portfolio.name, schema: PortfolioSchema },
      { name: ProficiencyLanguage.name, schema: ProficiencyLanguageSchema },
      { name: Service.name, schema: ServiceSchema },
      { name: Skill.name, schema: SkillSchema },
      { name: Status.name, schema: StatusSchema },
      { name: Workmode.name, schema: WorkmodeSchema },
    ]),
  ],
  providers: [GenericsService],
  controllers: [GenericsController],
})
export class GenericsModule {}
