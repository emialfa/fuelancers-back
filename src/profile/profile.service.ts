import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseOK, ResponseError } from '../common/responses/responses';
import {
  DTOPersonalInfo,
  DTODegrees,
  DTOExperience,
  DTOLanguages,
  DTOServices,
  DTOWorkMode,
  DTOStatus,
} from './dto';
import { DTOSkill } from './dto/skill.dto';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/user.model';
import { Model } from 'mongoose';
import { Degree } from '../generics/models/degree.model';
import { Service } from '../generics/models/service.model';
import { Portfolio } from '../generics/models/portfolio.model';
import FormData from 'form-data';
import axios from 'axios';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Degree.name) private readonly degreeModel: Model<Degree>,
    @InjectModel(Service.name) private readonly serviceModel: Model<Service>,
    @InjectModel(Portfolio.name) private readonly portfolioModel: Model<Portfolio>,
    private config: ConfigService,
  ) {}

  // Services Personal Data
  async updatePersonalInfo(id: string, dto: DTOPersonalInfo) {
    try {
      await this.userModel.findByIdAndUpdate(id, {
        profileInfo: {
          title: dto.title,
          description: dto.description,
        },
      });

      return ResponseOK('updated successfully');
    } catch (error) {
      console.log(error);
      ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  // Status

  async updateStatus(dto: DTOStatus) {
    try {
      await this.userModel.findByIdAndUpdate(dto.id_exp, {
        status: {
          status: dto.id_status,
          createdAt: new Date(),
        },
      });
      return ResponseOK('updated successfully');
    } catch (error) {
      ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  // services to degreess

  async createDegree(idExp: string, dto: DTODegrees) {
    console.log({ dto });
    try {
      const degreeCreated = await this.degreeModel.create({
        ...dto,
        user: idExp,
      });
      await this.userModel.findByIdAndUpdate(idExp, {
        $push: { degrees: degreeCreated },
      });
      return ResponseOK('Created successfully');
    } catch (error) {
      console.log(error);
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async updateDegree(idExp: string, idDegree: string, dto: DTODegrees) {
    try {
      await this.degreeModel.findByIdAndUpdate(idDegree, dto);

      return ResponseOK('Updated successfully');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async deleteDegree(idExp: string, idDegree: string) {
    try {
      await this.degreeModel.findByIdAndDelete(idDegree);

      await this.userModel.findByIdAndUpdate(idExp, {
        $pull: { degrees: idDegree },
      });

      return ResponseOK('Deleted successfully');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  // services

  async createService(idExp: string, dto: DTOServices) {
    try {
      const serviceCreated = await this.serviceModel.create({ ...dto, user: idExp });

      await this.userModel.findByIdAndUpdate(idExp, {
        $push: { services: serviceCreated },
      });

      return ResponseOK('Created successfully');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async updateService(idExp: string, idService: string, dto: DTOServices) {
    try {
      await this.serviceModel.findByIdAndUpdate(idService, dto);

      return ResponseOK('Updated successfully ');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async deleteService(idExp: string, idService: string) {
    try {
      await this.serviceModel.findByIdAndDelete(idService);

      await this.userModel.findByIdAndUpdate(idExp, {
        $pull: { services: idService },
      });

      return ResponseOK('Deleted successfully');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  // languages
  async createLanguage(dto: DTOLanguages) {
    try {
      await this.userModel.findByIdAndUpdate(dto.id_exp, {
        $push: {
          languages: {
            language: dto.id_language,
            proficiency: dto.id_proficiency,
          },
        },
      });

      return ResponseOK('Language successfully created');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async updateLanguage(querys: any, dto: DTOLanguages) {
    try {
      // await this.prisma.expertLanguage.update({
      //   where: {
      //     id: parseInt(querys.id_expert_language),
      //   },
      //   data: {
      //     language: {
      //       update: {
      //         where: {
      //           language_id_language_expert_id: {
      //             language_id: parseInt(querys.id_language),
      //             language_expert_id: parseInt(querys.id_expert_language),
      //           },
      //         },
      //         data: {
      //           language: {
      //             connect: { id: dto.id_language },
      //           },
      //         },
      //       },
      //     },
      //     proficiency: {
      //       update: {
      //         where: {
      //           proficiency_id_language_expert_id: {
      //             proficiency_id: parseInt(querys.id_proficiency),
      //             language_expert_id: parseInt(querys.id_expert_language),
      //           },
      //         },
      //         data: {
      //           proficiency: {
      //             connect: { id: dto.id_proficiency },
      //           },
      //         },
      //       },
      //     },
      //   },
      // });

      return ResponseOK('updated successfully');
    } catch (error) {
      console.log(error);
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async deleteLanguage(idExp: string, idLanguage: string) {
    try {
      await this.userModel.findByIdAndUpdate(idExp, {
        languages: { $pull: { language: idLanguage } },
      });
      // await this.getLanguageByID(idLanguage);

      // await this.prisma.expert.update({
      //   where: {
      //     id: parseInt(idExp),
      //   },
      //   data: {
      //     languages: {
      //       deleteMany: [{ id: parseInt(idLanguage) }],
      //     },
      //   },
      // });

      return ResponseOK('Deleted successfully');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  // EXPERIENCE

  async updateExperience(dto: DTOExperience) {
    try {
      console.log(dto);
      await this.userModel.findByIdAndUpdate(dto.id_exp, {
        experience: {
          experience: dto.id_experience,
        },
      });
      return ResponseOK('Updated successfully');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  // WORK MODE
  async updateWorkMode(dto: DTOWorkMode) {
    try {
      await this.userModel.findByIdAndUpdate(dto.id_exp, {
        workmode: {
          workmode: dto.id_work_mode,
        },
      });
      return ResponseOK('Updated successfully');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  // NOTE: SKILLS

  async updateSkills(dto: DTOSkill) {
    try {
      await this.userModel.findByIdAndUpdate(dto.id_exp, {
        skills: {
          $push: { skill: dto.id_skill, createdAt: Date.now() },
        },
      });

      return ResponseOK('Skill successfully created');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async uploadImagePortfolio(file: Express.Multer.File, idExp: string, cite: string) {
    const isValidatedType = this.validateTypeFiles(file);
    if (!isValidatedType) {
      return ResponseError('Invalid file format.', HttpStatus.FORBIDDEN);
    }

    try {
      const url_img = await this.uploadImageOnImgBB(file);

      const portfolioCreated = await this.portfolioModel.create({
        cite: cite,
        image: url_img,
        user: idExp,
      });

      await this.userModel.findByIdAndUpdate(idExp, {
        $push: { portfolios: { portfolio: portfolioCreated, createdAt: Date.now() } },
      });

      return ResponseOK('Image uploaded Successfully');
    } catch (error) {
      console.log(error);
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async updateImagePortfolio(file: Express.Multer.File | null, cite: string, idPorfolio: string) {
    if (!!file) {
      const isValidatedType = this.validateTypeFiles(file);
      if (!isValidatedType) {
        return ResponseError('Invalid file format.', HttpStatus.FORBIDDEN);
      }
    }

    try {
      let url_img = '';
      const data: { cite: string; image?: string } = {
        cite: cite,
      };
      if (!!file) {
        url_img = await this.uploadImageOnImgBB(file);
        data.image = url_img;
      }

      await this.portfolioModel.findByIdAndUpdate(idPorfolio, {
        ...data,
      });

      // await this.prisma.expertPortfolio.update({
      //   where: {
      //     id: parseInt(idPorfolio),
      //   },
      //   data: {
      //     ...data,
      //   },
      // });

      return ResponseOK('Updated image Successfully', 200);
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async deletePortfolio(idPortfolio: string) {
    try {
      await this.portfolioModel.findByIdAndDelete(idPortfolio);

      return ResponseOK('Deleted image Successfully', 200);
    } catch (error) {
      console.log(error);
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async uploadImageOnImgBB(file: Express.Multer.File): Promise<string> {
    // const blob = new Blob([file.buffer], { type: file.mimetype });
    const formData = new FormData();
    formData.append('image', file.buffer, file.originalname);

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${this.config.get('KEY_IMGBB')}`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      },
    );

    return response.data.data.image.url;
  }

  validateTypeFiles(file: Express.Multer.File) {
    const mimeType: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
    let isValidatedType = true;
    if (!mimeType.includes(file.mimetype)) {
      isValidatedType = false;
    }

    return isValidatedType;
  }
}
