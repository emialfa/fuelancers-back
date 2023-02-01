import { ForbiddenException, Injectable } from '@nestjs/common';
import { ResponseOK } from 'src/common/responses/responses';
import { PrismaService } from 'src/prisma/prisma.service';
import { DTOBasicData, DTODegrees, DTOLanguages, DTOServices } from './dto';

@Injectable()
export class TechnicianService {
  constructor(private prisma: PrismaService) {}

  // services
  async getTechnician(id: string) {
    const technician = await this.prisma.technician.findUnique({
      where: {
        userId: parseInt(id),
      },
      select: {
        basic: {},
        degrees: {},
      },
    });

    if (!technician) throw new ForbiddenException("The technician's profile has not been found");

    return technician;
  }

  // Services Basic data

  async createBasicData(idTec: string, dto: DTOBasicData) {
    try {
      await this.prisma.basicProfile.create({
        data: {
          ...dto,
          technician: {
            connect: { id: parseInt(idTec) },
          },
        },
      });

      return ResponseOK('Basic data successfully created');
    } catch (error) {
      throw new ForbiddenException('An error occurred.');
    }
  }

  async updateBasicData(idTec: string, dto: DTOBasicData) {
    try {
      await this.prisma.technician.update({
        where: {
          id: parseInt(idTec),
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

  async createDegree(idTec: string, dto: DTODegrees) {
    try {
      await this.prisma.degree.create({
        data: {
          ...dto,
          technician: {
            connect: { id: parseInt(idTec) },
          },
        },
      });

      return ResponseOK('Degree successfully created');
    } catch (error) {
      throw new ForbiddenException('An error occurred.');
    }
  }

  async updateDegree(idTec: string, idDegree: string, dto: DTODegrees) {
    try {
      await this.getDegreeByID(idDegree);

      await this.prisma.technician.update({
        where: {
          id: parseInt(idTec),
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

  async deleteDegree(idTec: string, idDegree: string) {
    try {
      await this.getDegreeByID(idDegree);

      await this.prisma.technician.update({
        where: {
          id: parseInt(idTec),
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

  async createService(idTec: string, dto: DTOServices) {
    try {
      await this.prisma.service.create({
        data: {
          ...dto,
          technician: {
            connect: { id: parseInt(idTec) },
          },
        },
      });

      return ResponseOK('Service successfully created');
    } catch (error) {
      throw new ForbiddenException('An error occurred.');
    }
  }

  async updateService(idTec: string, idService: string, dto: DTOServices) {
    try {
      await this.getServiceByID(idService);

      await this.prisma.technician.update({
        where: {
          id: parseInt(idTec),
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

  async deleteService(idTec: string, idService: string) {
    try {
      await this.getServiceByID(idService);

      await this.prisma.technician.update({
        where: {
          id: parseInt(idTec),
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
  async createLanguage(idTec: string, dto: DTOLanguages) {
    try {
      await this.prisma.language.create({
        data: {
          ...dto,
          technician: {
            connect: { id: parseInt(idTec) },
          },
        },
      });

      return ResponseOK('Language successfully created');
    } catch (error) {
      throw new ForbiddenException('An error occurred.');
    }
  }

  async updateLanguage(idTec: string, idLanguage: string, dto: DTOLanguages) {
    try {
      await this.getLanguageByID(idLanguage);

      await this.prisma.technician.update({
        where: {
          id: parseInt(idTec),
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

  async deleteLanguage(idTec: string, idLanguage: string) {
    try {
      await this.getLanguageByID(idLanguage);

      await this.prisma.technician.update({
        where: {
          id: parseInt(idTec),
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
