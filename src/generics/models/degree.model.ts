import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../user/user.model';

export type DegreeDocument = Degree & Document;

@Schema({ timestamps: true })
export class Degree {
  @Prop({ required: true })
  field: string;

  @Prop({ required: true })
  academicDegree: string;

  @Prop({ type: Date, required: true })
  start: Date;

  @Prop({ type: Date })
  end: Date;

  @Prop({ required: true })
  school: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export const DegreeSchema = SchemaFactory.createForClass(Degree);
