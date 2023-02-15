import { Module } from '@nestjs/common';
import { GenericsService } from './generics.service';
import { GenericsController } from './generics.controller';

@Module({
  providers: [GenericsService],
  controllers: [GenericsController],
})
export class GenericsModule {}
