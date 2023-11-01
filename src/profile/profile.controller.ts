import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { ProfileService } from './profile.service';
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
import { GetUser } from '../user/decorators';
import { User } from '../user/user.model';
import { DTOLocation } from './dto/location.dto';

@UseGuards(JwtGuard)
@Controller('api/v1/profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Patch('personal-info')
  async updatePersonalInfo(@GetUser() user: User, @Body() dto: DTOPersonalInfo) {
    return this.profileService.updatePersonalInfo(user._id, dto);
  }

  @Patch('location')
  async updateLocation(@GetUser() user: User, @Body() dto: DTOLocation) {
    return this.profileService.updateLocation(user._id, dto);
  }

  // NOTE: Status
  @Patch('status')
  async updateStatus(@Body() dto: DTOStatus) {
    return this.profileService.updateStatus(dto);
  }

  // NOTE: Degrees technician table

  @Post('degrees')
  async createDegree(@GetUser() user: User, @Body() dto: DTODegrees) {
    return this.profileService.createDegree(user._id, dto);
  }

  @Patch('degrees') // ?id_degree=:idDegree
  async updateDegree(
    @GetUser() user: User,
    @Query('id_degree') idDegree: string,
    @Body() dto: DTODegrees,
  ) {
    return this.profileService.updateDegree(user._id, idDegree, dto);
  }

  @Delete('degrees') // ?id_degree=:idDegree
  async deleteDegree(@GetUser() user: User, @Query('id_degree') idDegree: string) {
    return this.profileService.deleteDegree(user._id, idDegree);
  }

  // NOTE: Services Technician table

  @Post('services')
  async createService(@GetUser() user: User, @Body() dto: DTOServices) {
    return this.profileService.createService(user._id, dto);
  }

  @Patch('services') // ?id_service=:idService
  async updateService(
    @GetUser() user: User,
    @Query('id_service') idService: string,
    @Body() dto: DTOServices,
  ) {
    return this.profileService.updateService(user._id, idService, dto);
  }

  @Delete('services') // ?id_service=:idService
  async deleteService(@GetUser() user: User, @Query('id_service') idService: string) {
    return this.profileService.deleteService(user._id, idService);
  }

  // NOTE: Languages Technician table

  @Post('languages')
  async createLanguage(@Body() dto: DTOLanguages) {
    return this.profileService.createLanguage(dto);
  }

  @Patch('languages') // ?id_language=:idLanguage
  async updateLanguage(@Query() querys, @Body() dto: any) {
    return this.profileService.updateLanguage(querys, dto);
  }

  @Delete('languages') // ?id_language=:idLanguage
  async deleteLanguage(@GetUser() user: User, @Query('id_language') idLanguage: string) {
    return this.profileService.deleteLanguage(user._id, idLanguage);
  }

  // NOTE: EXPERIENCE
  @Patch('experience')
  async updateExperience(@Body() dto: DTOExperience) {
    return this.profileService.updateExperience(dto);
  }

  // NOTE: Work Mode
  @Patch('work-mode')
  async updateWorkMode(@Body() dto: DTOWorkMode) {
    return this.profileService.updateWorkMode(dto);
  }

  // NOTE: Skills
  @Patch('skills')
  async updateSkills(@Body() dto: DTOSkill) {
    return this.profileService.updateSkills(dto);
  }

  // NOTE: UploadImage
  @Post('portfolio')
  @UseInterceptors(FileInterceptor('image'))
  async uploadBgImage(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
    @Body() body: any,
  ) {
    return this.profileService.uploadImagePortfolio(file, user._id, body.cite);
  }

  // NOTE: UploadImage
  @Patch('portfolio')
  @UseInterceptors(FileInterceptor('image'))
  async updateImagePortfolio(
    @UploadedFile() file: Express.Multer.File,
    @Query('id_portfolio') idPorfolio: string,
    @Body() body: any,
  ) {
    return this.profileService.updateImagePortfolio(file, body.cite, idPorfolio);
  }

  // NOTE: UploadImage
  @Delete('portfolio')
  async deletePortfolio(@Query('id_portfolio') idPortfolio: string) {
    return this.profileService.deletePortfolio(idPortfolio);
  }
}
