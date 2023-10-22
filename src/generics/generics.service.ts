import { Injectable } from '@nestjs/common';

// dto
import { ListDTO } from './dto/list.dto';

// response
import { ResponseGet, ResponseError, ResponseOK } from 'src/common/responses/responses';
import { Category } from './models/category.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Degree } from './models/degree.model';
import { Experience } from './models/experience.mode';
import { Language } from './models/language.model';
import { Location } from './models/location.model';
import { Portfolio } from './models/portfolio.model';
import { ProficiencyLanguage } from './models/proficiencyLanguage.model';
import { Service } from './models/service.model';
import { Skill } from './models/skill.model';
import { Status } from './models/status.model';
import { Workmode } from './models/workmode.model';

@Injectable()
export class GenericsService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(Degree.name) private readonly degreeModel: Model<Degree>,
    @InjectModel(Experience.name) private readonly experienceModel: Model<Experience>,
    @InjectModel(Language.name) private readonly languageModel: Model<Language>,
    @InjectModel(Location.name) private readonly locationModel: Model<Location>,
    @InjectModel(Portfolio.name) private readonly portfolioModel: Model<Portfolio>,
    @InjectModel(ProficiencyLanguage.name)
    private readonly proficiencyLanguageModel: Model<ProficiencyLanguage>,
    @InjectModel(Service.name) private readonly serviceModel: Model<Service>,
    @InjectModel(Skill.name) private readonly skillModel: Model<Skill>,
    @InjectModel(Status.name) private readonly statusModel: Model<Status>,
    @InjectModel(Workmode.name) private readonly workmodeModel: Model<Workmode>,
  ) {}

  async getDegreeCategories() {
    try {
      // const categoriesList = await this.prisma.categoryDegrees.findMany();
      const categoriesList = await this.categoryModel.find();

      return ResponseGet(categoriesList);
    } catch (error) {
      console.log(error);
      return ResponseError(error);
    }
  }

  async createDegreeCategories(dto: ListDTO) {
    try {
      await this.degreeModel.create({
        ...dto,
      });
      return ResponseOK('created successfully');
    } catch (error) {
      return ResponseError(error);
    }
  }

  // NOTE: *** LANGUAGE ***
  async createLanguage(dto: ListDTO) {
    try {
      await this.languageModel.create({
        ...dto,
      });
      return ResponseOK('created successfully');
    } catch (error) {
      return ResponseError(error);
    }
  }

  async getLanguage() {
    try {
      const languageList = await this.languageModel.find();

      return ResponseGet(languageList);
    } catch (error) {
      console.log(error);
      return ResponseError(error);
    }
  }

  // NOTE: *** PROFICIENCY ***
  async createProficiency(dto: ListDTO) {
    try {
      await this.proficiencyLanguageModel.create({
        ...dto,
      });
      return ResponseOK('created successfully');
    } catch (error) {
      return ResponseError(error);
    }
  }

  async getProficiency() {
    try {
      const languageList = await this.proficiencyLanguageModel.find();

      return ResponseGet(languageList);
    } catch (error) {
      return ResponseError(error);
    }
  }

  // NOTE: *** WORK MODE ***
  async createWorkMode(dto: ListDTO) {
    try {
      await this.workmodeModel.create({
        ...dto,
      });
      return ResponseOK('created successfully');
    } catch (error) {
      return ResponseError(error);
    }
  }

  async getWorkMode() {
    try {
      const workModeList = await this.workmodeModel.find();

      return ResponseGet(workModeList);
    } catch (error) {
      return ResponseError(error);
    }
  }

  // NOTE: *** EXPERIENCE ***
  async createExperience(dto: ListDTO) {
    try {
      await this.experienceModel.create({
        ...dto,
      });
      return ResponseOK('created successfully');
    } catch (error) {
      return ResponseError(error);
    }
  }

  async getExperience() {
    try {
      const experienceList = await this.experienceModel.find();

      return ResponseGet(experienceList);
    } catch (error) {
      return ResponseError(error);
    }
  }

  // NOTE: *** SKILLS ***
  async createSkill(dto: ListDTO) {
    try {
      await this.skillModel.create({
        ...dto,
      });
      return ResponseOK('created successfully');
    } catch (error) {
      return ResponseError(error);
    }
  }

  async getSkills() {
    try {
      const skillList = await this.skillModel.find();

      return ResponseGet(skillList);
    } catch (error) {
      return ResponseError(error);
    }
  }

  // NOTE: *** STATUS ***
  async createStatus(dto: ListDTO) {
    try {
      await this.statusModel.create({
        ...dto,
      });
      return ResponseOK('created successfully');
    } catch (error) {
      return ResponseError(error);
    }
  }

  async getStatus() {
    try {
      const skillList = await this.statusModel.find();

      return ResponseGet(skillList);
    } catch (error) {
      return ResponseError(error);
    }
  }
}
