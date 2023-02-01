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
import { JwtGuard } from 'src/auth/guard';
import { TechnicianService } from './technician.service';
import { DTOBasicData } from './dto/basic.dto';
import { DTODegrees, DTOServices } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Technician')
@UseGuards(JwtGuard)
@Controller('api/v1/technician')
export class TechnicianController {
  constructor(private technicianService: TechnicianService) {}

  @Get(':id_user') // id user
  async getTechnician(@Param('id_user') id: string) {
    return this.technicianService.getTechnician(id);
  }

  // Basic technician table

  @Post('basic/create/:id_tec')
  async createBasicData(@Param('id_tec') idTec: string, @Body() dto: DTOBasicData) {
    return this.technicianService.createBasicData(idTec, dto);
  }

  @Patch('basic/update/:id_tec')
  async updateBasicData(@Param('id_tec') idTec: string, @Body() dto: DTOBasicData) {
    return this.technicianService.updateBasicData(idTec, dto);
  }

  // Degrees technician table

  @Post('degrees/:id_tec')
  async createDegree(@Param('id_tec') idTec: string, @Body() dto: DTODegrees) {
    return this.technicianService.createDegree(idTec, dto);
  }

  @Patch('degrees/:id_tec') // ?id_degree=:idDegree
  async updateDegree(
    @Param('id_tec') idTec: string,
    @Query('id_degree') idDegree: string,
    @Body() dto: DTODegrees,
  ) {
    console.log({ idTec, idDegree, dto });
    return this.technicianService.updateDegree(idTec, idDegree, dto);
  }

  @Delete('degrees/:id_tec') // ?id_degree=:idDegree
  async deleteDegree(@Param('id_tec') idTec: string, @Query('id_degree') idDegree: string) {
    return this.technicianService.deleteDegree(idTec, idDegree);
  }

  // Services Technician table

  @Post('services/:id_tec')
  async createService(@Param('id_tec') idTec: string, @Body() dto: DTOServices) {
    return this.technicianService.createService(idTec, dto);
  }

  @Patch('services/:id_tec') // ?id_service=:idService
  async updateService(
    @Param('id_tec') idTec: string,
    @Query('id_service') idService: string,
    @Body() dto: DTOServices,
  ) {
    return this.technicianService.updateService(idTec, idService, dto);
  }

  @Delete('services/:id_tec') // ?id_service=:idService
  async deleteService(@Param('id_tec') idTec: string, @Query('id_service') idService: string) {
    return this.technicianService.deleteService(idTec, idService);
  }

  // Languages Technician table

  @Post('languages/:id_tec')
  async createLanguage(@Param('id_tec') idTec: string, @Body() dto: any) {
    return this.technicianService.createLanguage(idTec, dto);
  }

  @Patch('languages/:id_tec') // ?id_language=:idLanguage
  async updateLanguage(
    @Param('id_tec') idTec: string,
    @Query('id_language') idLanguage: string,
    @Body() dto: any,
  ) {
    return this.technicianService.updateLanguage(idTec, idLanguage, dto);
  }

  @Delete('languages/:id_tec') // ?id_language=:idLanguage
  async deleteLanguage(@Param('id_tec') idTec: string, @Query('id_language') idLanguage: string) {
    return this.technicianService.deleteLanguage(idTec, idLanguage);
  }
}
