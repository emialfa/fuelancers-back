import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseGet, ResponseError } from '../common/responses/responses';

import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Role, User } from '../user/user.model';
import { Model } from 'mongoose';
import { Degree } from '../generics/models/degree.model';
import { Service } from '../generics/models/service.model';
import { Portfolio } from '../generics/models/portfolio.model';

@Injectable()
export class ExpertService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Degree.name) private readonly degreeModel: Model<Degree>,
    @InjectModel(Service.name) private readonly serviceModel: Model<Service>,
    @InjectModel(Portfolio.name) private readonly portfolioModel: Model<Portfolio>,
    private config: ConfigService,
  ) {}

  // services
  async getListExperts(querys: any) {
    let parseQueryLanguage: number[] = [];

    if (querys.language_id) {
      parseQueryLanguage = querys.language_id.split('-');
    }

    try {
      const experts = await this.userModel
        .find({
          role: Role.TECHNICIAN,
          ...(parseQueryLanguage?.length
            ? { languages: { $elemMatch: { language: { $in: parseQueryLanguage } } } }
            : {}),
          ...(querys?.experience_id?.length
            ? { 'experience.experience': querys.experience_id }
            : {}),
          ...(querys?.work_mode_id?.length ? { 'workmode.workmode': querys.work_mode_id } : {}),
        })
        .populate([
          'status.status',
          'languages.language',
          'languages.proficiency',
          'experience.experience',
          'workmode.workmode',
        ]);

      return ResponseGet(experts);
    } catch (error) {
      console.log(error);
      ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  // services
  async getExpertById(id: string) {
    try {
      const expert = await this.userModel
        .findById(id)
        .populate([
          'services',
          'degrees',
          'status.status',
          'languages.language',
          'languages.proficiency',
          'experience.experience',
          'workmode.workmode',
          'portfolios.portfolio',
        ]);

      if (!expert)
        return ResponseError("The expert's profile has not been found", HttpStatus.FORBIDDEN);

      return ResponseGet(expert);
    } catch (error) {
      return ResponseError(error);
    }
  }
}
