import { Body, Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { GenericsService } from './generics.service';
import { CategorieDegreeDTO } from './dto/categorie_degree.dto';

@Controller('api/v1/generics')
export class GenericsController {
  constructor(private genericsService: GenericsService) {}

  @Get('categories-degree')
  async getCategoriesDegree() {
    return this.genericsService.getDegreeCategories();
  }

  @Post('categories-degree')
  async createCategoriesDegree(@Body() dto: CategorieDegreeDTO) {
    return this.genericsService.createDegreeCategories(dto);
  }
}
