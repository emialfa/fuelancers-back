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
import { DTOSkill } from './dto/skill.dto';

@Injectable()
export class ExpertService {
  constructor(private prisma: PrismaService) {}

  // services
  async getListExperts(querys: any) {
    let parseQueryLanguage: number[] = [];

    if (querys.language_id) {
      parseQueryLanguage = querys.language_id.split('-').map((i: string) => parseInt(i));
    }

    try {
      const expert = await this.prisma.expert.findMany({
        where: {
          personal_info: {
            isNot: null,
          },
          ...(querys.language_id && {
            languages: {
              some: {
                language: {
                  some: {
                    language_id: {
                      in: parseQueryLanguage,
                    },
                  },
                },
              },
            },
          }),
          ...(querys.experience_id && {
            experience: {
              experience_id: parseInt(querys.experience_id),
            },
          }),
          ...(querys.work_mode_id && {
            work_mode: {
              work_mode_id: parseInt(querys.work_mode_id),
            },
          }),
        },
        select: {
          id: true,
          user: {
            select: {
              first_name: true,
              last_name: true,
            },
          },
          personal_info: {},
          status: {
            select: {
              status: {
                select: {
                  name: true,
                  id: true,
                },
              },
            },
          },
          skills: {
            select: {
              skill: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });
      console.log(expert);
      return ResponseGet(expert);
    } catch (error) {
      console.log(error);
      ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  // services
  async getExpertById(id: string) {
    try {
      const expert = await this.prisma.expert.findUnique({
        where: {
          id: parseInt(id),
        },
        select: {
          id: true,
          user: {
            select: {
              first_name: true,
              last_name: true,
            },
          },
          personal_info: {},
          degrees: {},
          status: {
            include: {
              status: {},
            },
          },
          languages: {
            select: {
              language: {
                include: {
                  language: {},
                },
              },
              proficiency: {
                include: {
                  proficiency: {},
                },
              },
            },
          },
          experience: {
            include: {
              experience: {},
            },
          },
          work_mode: {
            include: {
              work_mode: {},
            },
          },
        },
      });

      if (!expert)
        return ResponseError("The expert's profile has not been found", HttpStatus.FORBIDDEN);

      return ResponseGet(expert);
    } catch (error) {
      console.log(error);
      return ResponseError(error);
    }
  }

  // Services Personal Data
  async updatePersonalInfo(idExp: string, dto: DTOPersonalInfo) {
    try {
      await this.prisma.expert.update({
        where: {
          id: parseInt(idExp),
        },
        data: {
          personal_info: {
            upsert: {
              create: {
                ...dto,
              },
              update: {
                ...dto,
              },
            },
          },
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
      return ResponseError(error, HttpStatus.FORBIDDEN);
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
  async createLanguage(dto: DTOLanguages) {
    try {
      const createLanguageExpert = await this.prisma.expertLanguage.create({
        data: {
          expert: {
            connect: {
              id: dto.id_exp,
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

  async updateLanguage(querys: any, dto: DTOLanguages) {
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

  async updateExperience(dto: DTOExperience) {
    try {
      await this.prisma.expert.update({
        where: {
          id: dto.id_exp,
        },
        data: {
          experience: {
            upsert: {
              create: {
                experience: {
                  connect: {
                    id: dto.id_experience,
                  },
                },
              },
              update: {
                experience: {
                  connect: {
                    id: dto.id_experience,
                  },
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
  async updateWorkMode(dto: DTOWorkMode) {
    try {
      await this.prisma.expert.update({
        where: {
          id: dto.id_exp,
        },
        data: {
          work_mode: {
            upsert: {
              create: {
                work_mode: {
                  connect: {
                    id: dto.id_work_mode,
                  },
                },
              },
              update: {
                work_mode: {
                  connect: {
                    id: dto.id_work_mode,
                  },
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

  // NOTE: SKILLS

  async updateSkills(dto: DTOSkill) {
    try {
      await this.prisma.expert.update({
        where: {
          id: dto.id_exp,
        },
        data: {
          skills: {
            create: [
              {
                skill: {
                  connect: {
                    id: dto.id_skill,
                  },
                },
              },
            ],
          },
        },
      });

      return ResponseOK('Skill successfully created');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }
}
