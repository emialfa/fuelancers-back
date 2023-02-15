import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

// dto
import { CategorieDegreeDTO } from './dto/categorie_degree.dto';

@Injectable()
export class GenericsService {
  constructor(private prisma: PrismaService) {}

  async getDegreeCategories() {
    try {
      const list = await this.prisma.categoryDegrees.findMany();
      return list;
    } catch (error) {
      return error;
    }
  }

  async createDegreeCategories(dto: CategorieDegreeDTO) {
    try {
      const category = await this.prisma.categoryDegrees.create({
        data: {
          ...dto,
        },
      });
      return category;
    } catch (error) {
      return error;
    }
  }
}
