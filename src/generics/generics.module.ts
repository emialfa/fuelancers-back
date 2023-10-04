import { Module } from '@nestjs/common';
import { GenericsService } from './generics.service';
import { GenericsController } from './generics.controller';

@Module({
  // imports: [
  //   MongooseModule.forFeature([{ name: 'List', schema: ListSchema }]),
  // ],
  providers: [GenericsService],
  controllers: [GenericsController],
})
export class GenericsModule {}
