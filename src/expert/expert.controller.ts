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
import { DTOPersonalInfo } from './dto/personal_data.dto';
import {
  DTODegrees,
  DTOServices,
  DTOLanguages,
  DTOExperience,
  DTOWorkMode,
  DTOStatus,
} from './dto';

// @UseGuards(JwtGuard)
@Controller('api/v1/experts')
export class ExpertController {
  constructor(private expertService: ExpertService) {}

  @Get()
  async getAllExperts(@Query() querys) {
    return this.expertService.getAllExperts(querys);
  }

  @Get(':id_exp') // id user
  async getExpert(@Param('id_exp') id: string) {
    return this.expertService.getExpert(id);
  }

  // NOTE: Personal Data technician table

  @Post('personal-info/create/:id_exp')
  async createPersonalInfo(@Param('id_exp') idExp: string, @Body() dto: DTOPersonalInfo) {
    return this.expertService.createPersonalInfo(idExp, dto);
  }

  @Patch('personal-status/:id_exp')
  async updatePersonalInfo(@Param('id_exp') idExp: string, @Body() dto: DTOPersonalInfo) {
    return this.expertService.updatePersonalInfo(idExp, dto);
  }

  // NOTE: Status
  @Patch('status')
  async updateStatus(@Body() dto: DTOStatus) {
    return this.expertService.updateStatus(dto);
  }

  // NOTE: Degrees technician table

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

  // NOTE: Services Technician table

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

  // NOTE: Languages Technician table

  @Post('languages/:id_exp')
  async createLanguage(@Param('id_exp') idExp: string, @Body() dto: DTOLanguages) {
    return this.expertService.createLanguage(idExp, dto);
  }

  @Patch('languages/:id_exp') // ?id_language=:idLanguage
  async updateLanguage(@Param('id_exp') idExp: string, @Query() querys, @Body() dto: any) {
    return this.expertService.updateLanguage(idExp, querys, dto);
  }

  @Delete('languages/:id_exp') // ?id_language=:idLanguage
  async deleteLanguage(@Param('id_exp') idExp: string, @Query('id_language') idLanguage: string) {
    return this.expertService.deleteLanguage(idExp, idLanguage);
  }

  // NOTE: EXPERIENCE
  @Post('experience')
  async createExperience(@Body() dto: DTOExperience) {
    return this.expertService.createExperience(dto);
  }

  @Patch('experience')
  async updateExperience(@Body() dto: DTOExperience) {
    return this.expertService.updateExperience(dto);
  }

  // NOTE: Work Mode
  @Post('work-mode')
  async createWorkMode(@Body() dto: DTOWorkMode) {
    return this.expertService.createWorkMode(dto);
  }

  @Patch('work-mode')
  async updateWorkMode(@Body() dto: DTOWorkMode) {
    return this.expertService.updateWorkMode(dto);
  }
}
