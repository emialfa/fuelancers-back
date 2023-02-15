import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { ExpertService } from './expert.service';
import { DTOBasicData } from './dto/basic.dto';
import { DTODegrees, DTOServices } from './dto';

@UseGuards(JwtGuard)
@Controller('api/v1/experts')
export class ExpertController {
  constructor(private expertService: ExpertService) {}

  @Get(':id_user') // id user
  async getTechnician(@Param('id_user') id: string) {
    return this.expertService.getExpert(id);
  }

  // Basic technician table

  @Post('basic/create/:id_exp')
  async createBasicData(@Param('id_exp') idExp: string, @Body() dto: DTOBasicData) {
    return this.expertService.createBasicData(idExp, dto);
  }

  @Patch('basic/update/:id_exp')
  async updateBasicData(@Param('id_exp') idExp: string, @Body() dto: DTOBasicData) {
    return this.expertService.updateBasicData(idExp, dto);
  }

  // Degrees technician table

  @Post('degrees/:id_exp')
  async createDegree(@Param('id_exp') idExp: string, @Body() dto: DTODegrees) {
    return this.expertService.createDegree(idExp, dto);
  }

  @Patch('degrees/:id_exp') // ?id_degree=:idDegree
  async updateDegree(
    @Param('id_exp') idExp: string,
    @Query('id_degree') idDegree: string,
    @Body() dto: DTODegrees,
  ) {
    return this.expertService.updateDegree(idExp, idDegree, dto);
  }

  @Delete('degrees/:id_exp') // ?id_degree=:idDegree
  async deleteDegree(@Param('id_exp') idExp: string, @Query('id_degree') idDegree: string) {
    return this.expertService.deleteDegree(idExp, idDegree);
  }

  // Services Technician table

  @Post('services/:id_exp')
  async createService(@Param('id_exp') idExp: string, @Body() dto: DTOServices) {
    return this.expertService.createService(idExp, dto);
  }

  @Patch('services/:id_exp') // ?id_service=:idService
  async updateService(
    @Param('id_exp') idExp: string,
    @Query('id_service') idService: string,
    @Body() dto: DTOServices,
  ) {
    return this.expertService.updateService(idExp, idService, dto);
  }

  @Delete('services/:id_exp') // ?id_service=:idService
  async deleteService(@Param('id_exp') idExp: string, @Query('id_service') idService: string) {
    return this.expertService.deleteService(idExp, idService);
  }

  // Languages Technician table

  @Post('languages/:id_exp')
  async createLanguage(@Param('id_exp') idExp: string, @Body() dto: any) {
    return this.expertService.createLanguage(idExp, dto);
  }

  @Patch('languages/:id_exp') // ?id_language=:idLanguage
  async updateLanguage(
    @Param('id_exp') idExp: string,
    @Query('id_language') idLanguage: string,
    @Body() dto: any,
  ) {
    return this.expertService.updateLanguage(idExp, idLanguage, dto);
  }

  @Delete('languages/:id_exp') // ?id_language=:idLanguage
  async deleteLanguage(@Param('id_exp') idExp: string, @Query('id_language') idLanguage: string) {
    return this.expertService.deleteLanguage(idExp, idLanguage);
  }
}
