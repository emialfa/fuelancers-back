import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

export type SkillDocument = Skill & Document;

@Schema({ timestamps: true })
export class Skill {
  @Prop({ required: true, unique: true })
  @IsNotEmpty({ message: 'The name cannot be empty' })
  name: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
