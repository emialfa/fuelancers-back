import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../user/user.model';

export type PortfolioDocument = Portfolio & Document;

@Schema({ timestamps: true })
export class Portfolio {
  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  cite: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
