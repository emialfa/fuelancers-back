import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkmodeDocument = Workmode & Document;

@Schema({ timestamps: true })
export class Workmode {
  @Prop({ required: true })
  name: string;
}

export const WorkmodeSchema = SchemaFactory.createForClass(Workmode);
