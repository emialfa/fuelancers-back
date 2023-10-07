import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExperienceDocument = Experience & Document;

@Schema({ timestamps: true })
export class Experience {
  @Prop({ required: true })
  name: string;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
