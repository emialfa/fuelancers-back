import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

// dto
import { ListDTO } from './dto/list.dto';

// response
import { ResponseGet, ResponseError, ResponseOK } from 'src/common/responses/responses';

@Injectable()
export class GenericsService {
  constructor(private prisma: PrismaService) { }

  async getDegreeCategories() {
    try {
      const categoriesList = await this.prisma.categoryDegrees.findMany();

      return ResponseGet(categoriesList);
    } catch (error) {
      console.log(error);
      return ResponseError(error);
    }
  }

  async createDegreeCategories(dto: ListDTO) {
    try {
      await this.prisma.categoryDegrees.create({
        data: {
          ...dto,
        },
      });
      return ResponseOK('created successfully');
    } catch (error) {
      return ResponseError(error);
    }
  }

  // NOTE: *** LANGUAGE ***
  async createLanguage(dto: ListDTO) {
    try {
      await this.prisma.languages.create({
        data: {
          ...dto,
        },
      });
      return ResponseOK('created successfully');
    } catch (error) {
      return ResponseError(error);
    }
  }

  async getLanguage() {
    try {
      const languageList = await this.prisma.languages.findMany();

      return ResponseGet(languageList);
    } catch (error) {
      console.log(error);
      return ResponseError(error);
    }
  }

  // NOTE: *** PROFICIENCY ***
  async createProficiency(dto: ListDTO) {
    try {
      await this.prisma.proficiency.create({
        data: {
          ...dto,
        },
      });
      return ResponseOK('created successfully');
    } catch (error) {
      return ResponseError(error);
    }
  }

  async getProficiency() {
    try {
      const languageList = await this.prisma.proficiency.findMany();

      return ResponseGet(languageList);
    } catch (error) {
      return ResponseError(error);
    }
  }

  // NOTE: *** WORK MODE ***
  async createWorkMode(dto: ListDTO) {
    try {
      await this.prisma.workMode.create({
        data: {
          ...dto,
        },
      });
      return ResponseOK('created successfully');
    } catch (error) {
      return ResponseError(error);
    }
  }

  async getWorkMode() {
    try {
      const workModeList = await this.prisma.workMode.findMany();

      return ResponseGet(workModeList);
    } catch (error) {
      return ResponseError(error);
    }
  }

  // NOTE: *** EXPERIENCE ***
  async createExperience(dto: ListDTO) {
    try {
      await this.prisma.experience.create({
        data: {
          ...dto,
        },
      });
      return ResponseOK('created successfully');
    } catch (error) {
      return ResponseError(error);
    }
  }

  async getExperience() {
    try {
      const experienceList = await this.prisma.experience.findMany();

      return ResponseGet(experienceList);
    } catch (error) {
      return ResponseError(error);
    }
  }

  // NOTE: *** SKILLS ***
  async createSkill(dto: ListDTO) {
    try {
      await this.prisma.skill.create({
        data: {
          ...dto,
        },
      });
      return ResponseOK('created successfully');
    } catch (error) {
      return ResponseError(error);
    }
  }

  async getSkills() {
    try {
      const skillList = await this.prisma.skill.findMany();

      return ResponseGet(skillList);
    } catch (error) {
      return ResponseError(error);
    }
  }

  // NOTE: *** STATUS ***
  async createStatus(dto: ListDTO) {
    try {
      await this.prisma.status.create({
        data: {
          ...dto,
        },
      });
      return ResponseOK('created successfully');
    } catch (error) {
      return ResponseError(error);
    }
  }

  async getStatus() {
    try {
      const skillList = await this.prisma.status.findMany();

      return ResponseGet(skillList);
    } catch (error) {
      return ResponseError(error);
    }
  }
}
