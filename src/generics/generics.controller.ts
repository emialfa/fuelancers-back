import { Body, Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { GenericsService } from './generics.service';
import { ListDTO } from './dto/list.dto';

@Controller('api/v1/generics')
export class GenericsController {
  constructor(private genericsService: GenericsService) {}

  @Get('degree-categories')
  async getCategoriesDegree() {
    return this.genericsService.getDegreeCategories();
  }

  @Post('degree-categories')
  async createCategoriesDegree(@Body() dto: ListDTO) {
    return this.genericsService.createDegreeCategories(dto);
  }

  @Post('language')
  async createLanguage(@Body() dto: ListDTO) {
    return this.genericsService.createLanguage(dto);
  }

  @Get('proficiency')
  async getproficiency() {
    return this.genericsService.getProficiency();
  }

  @Post('proficiency')
  async createproficiency(@Body() dto: ListDTO) {
    return this.genericsService.createProficiency(dto);
  }

  @Get('language')
  async getLanguage() {
    return this.genericsService.getLanguage();
  }

  @Post('work-mode')
  async createWorkMode(@Body() dto: ListDTO) {
    return this.genericsService.createWorkMode(dto);
  }

  @Get('work-mode')
  async getWorkMode() {
    return this.genericsService.getWorkMode();
  }

  @Post('experience')
  async createExperience(@Body() dto: ListDTO) {
    return this.genericsService.createExperience(dto);
  }

  @Get('experience')
  async getExperience() {
    return this.genericsService.getExperience();
  }

  @Post('skill')
  async createSkill(@Body() dto: ListDTO) {
    return this.genericsService.createSkill(dto);
  }

  @Get('skill')
  async getSkill() {
    return this.genericsService.getSkills();
  }

  @Post('status')
  async createStatus(@Body() dto: ListDTO) {
    return this.genericsService.createStatus(dto);
  }

  @Get('status')
  async getStatus() {
    return this.genericsService.getStatus();
  }
}

// Migrating to mongoose

/* // generics.controller.ts
import { Body, Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { GenericsService } from './generics.service';
import { ListDTO } from './dto/list.dto';

@Controller('api/v1/generics')
export class GenericsController {
  constructor(private genericsService: GenericsService) {}

  @Get('degree-categories')
  async getCategoriesDegree() {
    return this.genericsService.getDegreeCategories();
  }

  @Post('degree-categories')
  async createCategoriesDegree(@Body() dto: ListDTO) {
    return this.genericsService.createDegreeCategories(dto);
  }

  @Post('language')
  async createLanguage(@Body() dto: ListDTO) {
    return this.genericsService.createLanguage(dto);
  }

  @Get('proficiency')
  async getproficiency() {
    return this.genericsService.getProficiency();
  }

  @Post('proficiency')
  async createproficiency(@Body() dto: ListDTO) {
    return this.genericsService.createProficiency(dto);
  }

  @Get('language')
  async getLanguage() {
    return this.genericsService.getLanguage();
  }

  @Post('work-mode')
  async createWorkMode(@Body() dto: ListDTO) {
    return this.genericsService.createWorkMode(dto);
  }

  @Get('work-mode')
  async getWorkMode() {
    return this.genericsService.getWorkMode();
  }

  @Post('experience')
  async createExperience(@Body() dto: ListDTO) {
    return this.genericsService.createExperience(dto);
  }

  @Get('experience')
  async getExperience() {
    return this.genericsService.getExperience();
  }

  @Post('skill')
  async createSkill(@Body() dto: ListDTO) {
    return this.genericsService.createSkill(dto);
  }

  @Get('skill')
  async getSkill() {
    return this.genericsService.getSkills();
  }

  @Post('status')
  async createStatus(@Body() dto: ListDTO) {
    return this.genericsService.createStatus(dto);
  }

  @Get('status')
  async getStatus() {
    return this.genericsService.getStatus();
  }
}
*/
