import { Controller, Get, Param, Query } from '@nestjs/common';
import { ExpertService } from './expert.service';

@Controller('api/v1/experts')
export class ExpertController {
  constructor(private expertService: ExpertService) {}

  @Get()
  async getAllExperts(@Query() querys) {
    return this.expertService.getListExperts(querys);
  }

  @Get(':id') // name user
  async getExpert(@Param('id') id: string) {
    return this.expertService.getExpertById(id);
  }
}
