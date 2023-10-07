import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProficiencyLanguageDocument = ProficiencyLanguage & Document;

@Schema({ timestamps: true })
export class ProficiencyLanguage {
  @Prop({ required: true })
  name: string;
}

export const ProficiencyLanguageSchema = SchemaFactory.createForClass(ProficiencyLanguage);
