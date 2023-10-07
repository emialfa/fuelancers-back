import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LanguageDocument = Language & Document;

@Schema({ timestamps: true })
export class Language {
  @Prop({ required: true })
  name: string;

  @Prop()
  iso: string;

  @Prop()
  flag: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
