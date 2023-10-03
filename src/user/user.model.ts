// user.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Role {
  USER = 'USER',
  TECHNICIAN = 'TECHNICIAN',
  ADMIN = 'ADMIN',
}

@Schema()
export class User extends Document {
  @Prop()
  email: string;

  @Prop()
  hash: string;

  @Prop({ enum: Role, default: Role.USER })
  role: Role;

  @Prop()
  phone: number;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  picture: string;

  @Prop()
  bgPhoto: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
