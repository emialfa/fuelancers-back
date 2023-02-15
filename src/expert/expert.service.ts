import { ForbiddenException, Injectable } from '@nestjs/common';
import { ResponseOK } from '../common/responses/responses';
import { PrismaService } from '../prisma/prisma.service';
import { DTOBasicData, DTODegrees, DTOLanguages, DTOServices } from './dto';

@Injectable()
export class ExpertService {
  constructor(private prisma: PrismaService) {}

  // services
  async getExpert(id: string) {
    const expert = await this.prisma.expert.findUnique({
      where: {
        user_id: parseInt(id),
      },
      select: {
        basic: {},
        degrees: {},
      },
    });

    if (!expert) throw new ForbiddenException("The expert's profile has not been found");

    return expert;
  }

  // Services Basic data

  async createBasicData(idExp: string, dto: DTOBasicData) {
    try {
      await this.prisma.basicProfile.create({
        data: {
          ...dto,
          expert: {
            connect: { id: parseInt(idExp) },
          },
        },
      });

      return ResponseOK('Basic data successfully created');
    } catch (error) {
      throw new ForbiddenException('An error occurred.');
    }
  }

  async updateBasicData(idExp: string, dto: DTOBasicData) {
    try {
      await this.prisma.expert.update({
        where: {
          id: parseInt(idExp),
        },
        data: {
          basic: {
            update: {
              ...dto,
            },
          },
        },
      });

      return ResponseOK('Basic data successfully updated');
    } catch (error) {
      throw new ForbiddenException('An error occurred.');
    }
  }

  // services to degreess

  async createDegree(idExp: string, dto: DTODegrees) {
    try {
      await this.prisma.degree.create({
        data: {
          ...dto,
          expert: {
            connect: { id: parseInt(idExp) },
          },
        },
      });

      return ResponseOK('Degree successfully created');
    } catch (error) {
      throw new ForbiddenException('An error occurred.');
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

      return ResponseOK('Degree successfully updated');
    } catch (error) {
      throw new ForbiddenException('An error occurred.');
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

      return ResponseOK('Degree successfully deleted');
    } catch (error) {
      throw new ForbiddenException('An error occurred.');
    }
  }

  async getDegreeByID(id: string) {
    const degree = await this.prisma.degree.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!degree) throw new ForbiddenException('Invalid degree ID');

    return true;
  }

  // services

  async createService(idExp: string, dto: DTOServices) {
    try {
      await this.prisma.service.create({
        data: {
          ...dto,
          expert: {
            connect: { id: parseInt(idExp) },
          },
        },
      });

      return ResponseOK('Service successfully created');
    } catch (error) {
      throw new ForbiddenException('An error occurred.');
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

      return ResponseOK('Service successfully updated');
    } catch (error) {
      throw new ForbiddenException('An error occurred.');
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

      return ResponseOK('Service successfully deleted');
    } catch (error) {
      throw new ForbiddenException('An error occurred.');
    }
  }

  async getServiceByID(id: string) {
    const service = await this.prisma.service.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!service) throw new ForbiddenException('Invalid service ID');

    return true;
  }

  // languages
  async createLanguage(idExp: string, dto: DTOLanguages) {
    try {
      await this.prisma.language.create({
        data: {
          ...dto,
          expert: {
            connect: { id: parseInt(idExp) },
          },
        },
      });

      return ResponseOK('Language successfully created');
    } catch (error) {
      throw new ForbiddenException('An error occurred.');
    }
  }

  async updateLanguage(idExp: string, idLanguage: string, dto: DTOLanguages) {
    try {
      await this.getLanguageByID(idLanguage);

      await this.prisma.expert.update({
        where: {
          id: parseInt(idExp),
        },
        data: {
          languages: {
            update: {
              where: {
                id: parseInt(idLanguage),
              },
              data: {
                ...dto,
              },
            },
          },
        },
      });

      return ResponseOK('Language successfully updated');
    } catch (error) {
      throw new ForbiddenException('An error occurred.');
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

      return ResponseOK('Language successfully deleted');
    } catch (error) {
      throw new ForbiddenException('An error occurred.');
    }
  }

  async getLanguageByID(id: string) {
    const language = await this.prisma.language.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!language) throw new ForbiddenException('Invalid language ID');

    return true;
  }
}
