import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseOK, ResponseGet, ResponseError } from '../common/responses/responses';
import { PrismaService } from '../prisma/prisma.service';
import {
  DTOPersonalInfo,
  DTODegrees,
  DTOExperience,
  DTOLanguages,
  DTOServices,
  DTOWorkMode,
  DTOStatus,
} from './dto';

@Injectable()
export class ExpertService {
  constructor(private prisma: PrismaService) {}

  // services
  async getAllExperts(querys: any) {
    try {
      const expert = await this.prisma.expert.findMany({
        where: {
          languages: {
            some: {
              language: {
                some: {
                  language_id: parseInt(querys.language_id) || {},
                },
              },
            },
          },
          experience: {
            experience_id: parseInt(querys.experience_id) || {},
          },
          work_mode: {
            work_mode_id: parseInt(querys.work_mode_id) || {},
          },
        },
        select: {
          id: true,
          personal_info: {},
        },
      });

      return ResponseGet(expert);
    } catch (error) {
      ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  // services
  async getExpert(id: string) {
    try {
      const expert = await this.prisma.expert.findUnique({
        where: {
          id: parseInt(id),
        },
        select: {
          personal_info: {},
          degrees: {},
          status: {
            include: {
              status: {},
            },
          },
          languages: {},
          experience: {
            include: {
              experience: {},
            },
          },
        },
      });

      if (!expert) ResponseError("The expert's profile has not been found", HttpStatus.FORBIDDEN);

      return ResponseGet(expert);
    } catch (error) {
      return ResponseError(error);
    }
  }

  // Services Personal Data

  async createPersonalInfo(idExp: string, dto: DTOPersonalInfo) {
    try {
      await this.prisma.expertPersonalInfo.create({
        data: {
          description: dto.description || '',
          title: dto.title || '',
          bgPhoto: dto.bg_photo || '',
          picture: dto.picture || '',
          expert: {
            connect: { id: parseInt(idExp) },
          },
        },
      });

      return ResponseOK('Created successfully');
    } catch (error) {
      ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async updatePersonalInfo(idExp: string, dto: DTOPersonalInfo) {
    try {
      await this.prisma.expert.update({
        where: {
          id: parseInt(idExp),
        },
        data: {
          personal_info: {
            update: {
              ...dto,
            },
          },
        },
      });

      return ResponseOK('updated successfully');
    } catch (error) {
      ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  // Status

  async updateStatus(dto: DTOStatus) {
    console.log(dto);
    try {
      await this.prisma.expert.update({
        where: {
          id: dto.id_exp,
        },
        data: {
          status: {
            upsert: {
              create: {
                status: {
                  connect: {
                    id: dto.id_status,
                  },
                },
              },
              update: {
                status: {
                  connect: {
                    id: dto.id_status,
                  },
                },
              },
            },
          },
        },
      });
      return ResponseOK('updated successfully');
    } catch (error) {
      ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  // services to degreess

  async createDegree(idExp: string, dto: DTODegrees) {
    try {
      await this.prisma.expertDegree.create({
        data: {
          ...dto,
          expert: {
            connect: { id: parseInt(idExp) },
          },
        },
      });

      return ResponseOK('Created successfully');
    } catch (error) {
      ResponseError(error, HttpStatus.FORBIDDEN);
      return ResponseError(error);
    }
  }

  async updateDegree(idExp: string, idDegree: string, dto: DTODegrees) {
    try {
      await this.getDegreeByID(idDegree);

      await this.prisma.expert.update({
        where: {
          id: parseInt(idExp),
        },
        data: {
          degrees: {
            update: {
              where: {
                id: parseInt(idDegree),
              },
              data: {
                ...dto,
              },
            },
          },
        },
      });

      return ResponseOK('Updated successfully');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async deleteDegree(idExp: string, idDegree: string) {
    try {
      await this.getDegreeByID(idDegree);

      await this.prisma.expert.update({
        where: {
          id: parseInt(idExp),
        },
        data: {
          degrees: {
            deleteMany: [{ id: parseInt(idDegree) }],
          },
        },
      });

      return ResponseOK('Deleted successfully');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  // NOTE:  *** DEGREE ***
  async getDegreeByID(id: string) {
    try {
      const degree = await this.prisma.expertDegree.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!degree) throw new ForbiddenException('Invalid degree ID');

      return true;
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  // services

  async createService(idExp: string, dto: DTOServices) {
    try {
      await this.prisma.expertService.create({
        data: {
          ...dto,
          expert: {
            connect: { id: parseInt(idExp) },
          },
        },
      });

      return ResponseOK('Created successfully');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async updateService(idExp: string, idService: string, dto: DTOServices) {
    try {
      await this.getServiceByID(idService);

      await this.prisma.expert.update({
        where: {
          id: parseInt(idExp),
        },
        data: {
          services: {
            update: {
              where: {
                id: parseInt(idService),
              },
              data: {
                ...dto,
              },
            },
          },
        },
      });

      return ResponseOK('Updated successfully ');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async deleteService(idExp: string, idService: string) {
    try {
      await this.getServiceByID(idService);

      await this.prisma.expert.update({
        where: {
          id: parseInt(idExp),
        },
        data: {
          services: {
            deleteMany: [{ id: parseInt(idService) }],
          },
        },
      });

      return ResponseOK('Deleted successfully');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async getServiceByID(id: string) {
    const service = await this.prisma.expertService.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!service) return ResponseError('Invalid service ID', HttpStatus.FORBIDDEN);

    return service;
  }

  // languages
  async createLanguage(idExp: string, dto: DTOLanguages) {
    try {
      const createLanguageExpert = await this.prisma.expertLanguage.create({
        data: {
          expert: {
            connect: {
              id: parseInt(idExp),
            },
          },
        },
      });

      await this.prisma.languagesOnExperts.create({
        data: {
          language: {
            connect: {
              id: dto.id_language,
            },
          },
          language_expert: {
            connect: {
              id: createLanguageExpert.id,
            },
          },
        },
      });

      await this.prisma.proficiencyOnExperts.create({
        data: {
          proficiency: {
            connect: {
              id: dto.id_proficiency,
            },
          },
          language_expert: {
            connect: {
              id: createLanguageExpert.id,
            },
          },
        },
      });

      return ResponseOK('Language successfully created');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async updateLanguage(idExp: string, querys: any, dto: DTOLanguages) {
    try {
      await this.prisma.expertLanguage.update({
        where: {
          id: parseInt(querys.id_expert_language),
        },
        data: {
          language: {
            update: {
              where: {
                language_id_language_expert_id: {
                  language_id: parseInt(querys.id_language),
                  language_expert_id: parseInt(querys.id_expert_language),
                },
              },
              data: {
                language: {
                  connect: { id: dto.id_language },
                },
              },
            },
          },
          proficiency: {
            update: {
              where: {
                proficiency_id_language_expert_id: {
                  proficiency_id: parseInt(querys.id_proficiency),
                  language_expert_id: parseInt(querys.id_expert_language),
                },
              },
              data: {
                proficiency: {
                  connect: { id: dto.id_proficiency },
                },
              },
            },
          },
        },
      });

      return ResponseOK('updated successfully');
    } catch (error) {
      console.log(error);
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async deleteLanguage(idExp: string, idLanguage: string) {
    try {
      await this.getLanguageByID(idLanguage);

      await this.prisma.expert.update({
        where: {
          id: parseInt(idExp),
        },
        data: {
          languages: {
            deleteMany: [{ id: parseInt(idLanguage) }],
          },
        },
      });

      return ResponseOK('Deleted successfully');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async getLanguageByID(id: string) {
    const language = await this.prisma.expertLanguage.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!language) throw new ForbiddenException('Invalid language ID');

    return true;
  }

  // EXPERIENCE

  async createExperience(dto: DTOExperience) {
    try {
      await this.prisma.expert.update({
        where: {
          id: dto.id_exp,
        },
        data: {
          experience: {
            create: {
              experience: {
                connect: {
                  id: dto.id_experience,
                },
              },
            },
          },
        },
      });
      return ResponseOK('Created successfully');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async updateExperience(dto: DTOExperience) {
    try {
      await this.prisma.expert.update({
        where: {
          id: dto.id_exp,
        },
        data: {
          experience: {
            update: {
              experience: {
                connect: {
                  id: dto.id_experience,
                },
              },
            },
          },
        },
      });
      return ResponseOK('Updated successfully');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  // WORK MODE

  async createWorkMode(dto: DTOWorkMode) {
    try {
      await this.prisma.expert.update({
        where: {
          id: dto.id_exp,
        },
        data: {
          work_mode: {
            create: {
              work_mode: {
                connect: {
                  id: dto.id_work_mode,
                },
              },
            },
          },
        },
      });
      return ResponseOK('Created successfully');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async updateWorkMode(dto: DTOWorkMode) {
    try {
      await this.prisma.expert.update({
        where: {
          id: dto.id_exp,
        },
        data: {
          work_mode: {
            update: {
              work_mode: {
                connect: {
                  id: dto.id_work_mode,
                },
              },
            },
          },
        },
      });
      return ResponseOK('Updated successfully');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }
}
