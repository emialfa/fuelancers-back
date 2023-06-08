import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
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
import { DTOSkill } from './dto/skill.dto';
import { FileInterceptor } from '@nestjs/platform-express';

// @UseGuards(JwtGuard)
@Controller('api/v1/experts')
export class ExpertController {
  constructor(private expertService: ExpertService) { }

  @Get()
  async getAllExperts(@Query() querys) {
    return this.expertService.getListExperts(querys);
  }

  @Get(':id_exp') // id user
  async getExpert(@Param('id_exp') id: string) {
    return this.expertService.getExpertById(id);
  }

  // NOTE: Personal Data technician table

  @Patch('personal-info/:id_exp')
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

  @Post('languages')
  async createLanguage(@Body() dto: DTOLanguages) {
    return this.expertService.createLanguage(dto);
  }

  @Patch('languages') // ?id_language=:idLanguage
  async updateLanguage(@Query() querys, @Body() dto: any) {
    return this.expertService.updateLanguage(querys, dto);
  }

  @Delete('languages') // ?id_language=:idLanguage
  async deleteLanguage(@Param('id_exp') idExp: string, @Query('id_language') idLanguage: string) {
    return this.expertService.deleteLanguage(idExp, idLanguage);
  }

  // NOTE: EXPERIENCE
  @Patch('experience')
  async updateExperience(@Body() dto: DTOExperience) {
    return this.expertService.updateExperience(dto);
  }

  // NOTE: Work Mode
  @Patch('work-mode')
  async updateWorkMode(@Body() dto: DTOWorkMode) {
    return this.expertService.updateWorkMode(dto);
  }

  // NOTE: Skills
  @Patch('skills')
  async updateSkills(@Body() dto: DTOSkill) {
    return this.expertService.updateSkills(dto);
  }

  // NOTE: UploadImage
  @Post('portfolio/:id_exp')
  @UseInterceptors(FileInterceptor('image'))
  async uploadBgImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id_exp') dto: string,
    @Body() body: any,
  ) {
    return this.expertService.uploadImagePortfolio(file, dto, body.cite);
  }

  // NOTE: UploadImage
  @Patch('portfolio')
  @UseInterceptors(FileInterceptor('image'))
  async updateImagePortfolio(
    @UploadedFile() file: Express.Multer.File,
    @Query('id_portfolio') idPorfolio: string,
    @Body() body: any,
  ) {
    return this.expertService.updateImagePortfolio(file, body.cite, idPorfolio);
  }

  // NOTE: UploadImage
  @Delete('portfolio')
  async deletePortfolio(@Query('id_portfolio') idPortfolio: string) {
    return this.expertService.deletePortfolio(idPortfolio);
  }
}
