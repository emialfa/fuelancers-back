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

  async getListExperts(querys: any) {
    try {
      const matchQuery = {
        role: Role.TECHNICIAN,
        ...(querys.language_id
          ? { languages: { $elemMatch: { language: { $in: querys.language_id.split('-') } } } }
          : {}),
        ...(querys?.experience_id ? { 'experience.experience': querys.experience_id } : {}),
        ...(querys?.work_mode_id
          ? { 'workmode.workmode': { $in: querys.work_mode_id.split('-') } }
          : {}),
        ...(querys?.skill_id ? { skills: { $in: querys.skill_id.split('-') } } : {}),
      };

      let expertsToSend;

      if (querys.lng) {
        const expertsWithoutPopulation = await this.userModel.aggregate([
          {
            $geoNear: {
              near: {
                type: 'Point',
                coordinates: [Number(querys.lng), Number(querys.lat)],
              },
              distanceField: 'distance',
              spherical: true,
            },
          },
          {
            $match: {
              distance: { $lte: Number(querys.dist && querys.dist > 0 ? querys.dist : 10) * 1000 },
            },
          },
          {
            $sort: {
              distance: 1,
            },
          },
        ]);

        const expertIds = expertsWithoutPopulation.map((expert) => expert._id);

        const experts = await this.userModel
          .find({ ...matchQuery, _id: { $in: expertIds } })
          .populate([
            'status.status',
            'languages.language',
            'languages.proficiency',
            'experience.experience',
            'workmode.workmode',
          ]);

        expertsToSend = expertsWithoutPopulation.flatMap(
          (expert) => experts.find((exp) => exp._id.toString() === expert._id.toString()) || [],
        );
      } else {
        expertsToSend = await this.userModel
          .find(matchQuery)
          .populate([
            'status.status',
            'languages.language',
            'languages.proficiency',
            'experience.experience',
            'workmode.workmode',
          ]);
      }

      return ResponseGet(expertsToSend);
    } catch (error) {
      console.log(error);
      return ResponseError(error, HttpStatus.FORBIDDEN);
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
          'skills',
        ]);

      if (!expert)
        return ResponseError("The expert's profile has not been found", HttpStatus.FORBIDDEN);

      return ResponseGet(expert);
    } catch (error) {
      return ResponseError(error);
    }
  }
}
