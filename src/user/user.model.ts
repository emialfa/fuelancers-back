// user.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export enum Role {
  USER = 'USER',
  TECHNICIAN = 'EXPERT',
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
  picture: string;

  @Prop()
  bgPhoto: string;

  @Prop({ type: { title: String, description: String } })
  profileInfo: {
    title: string;
    description: string;
  };

  @Prop({
    type: {
      name: String,
      geoLocation: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
        },
        coordinates: {
          type: [Number],
          default: [0, 0],
        },
      },
    },
    default: {
      name: 'Madrid, Spain',
      geoLocation: { type: 'Point', coordinates: [40.4167754, -3.7037902] },
    },
  })
  location: {
    name: string;
    geoLocation: {
      type: string;
      coordinates: number[];
    };
  };

  @Prop([{ user: { type: MongooseSchema.Types.ObjectId, ref: 'User' }, createdAt: Date }])
  contacts: { user: any; createdAt: Date }[];

  @Prop([{ user: { type: MongooseSchema.Types.ObjectId, ref: 'User' }, createdAt: Date }])
  favorites: { user: any; createdAt: Date }[];

  @Prop([{ category: { type: MongooseSchema.Types.ObjectId, ref: 'Category' }, createdAt: Date }])
  categories: { category: any; createdAt: Date }[];

  @Prop({
    type: {
      experience: { type: MongooseSchema.Types.ObjectId, ref: 'Experience' },
      createdAt: Date,
    },
  })
  experience: { experience: any; createdAt: Date };

  @Prop([
    {
      language: { type: MongooseSchema.Types.ObjectId, ref: 'Language' },
      proficiency: { type: MongooseSchema.Types.ObjectId, ref: 'ProficiencyLanguage' },
      createdAt: Date,
    },
  ])
  languages: { language: any; proficiency: any; createdAt: Date }[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Degree' }])
  degrees: any[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Skill' }])
  skills: string[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Service' }])
  services: any[];

  @Prop({
    type: { status: { type: MongooseSchema.Types.ObjectId, ref: 'Status' }, createdAt: Date },
  })
  status: { status: any; createdAt: Date };

  @Prop({
    type: { workmode: { type: MongooseSchema.Types.ObjectId, ref: 'Workmode' }, createdAt: Date },
  })
  workmode: { workmode: any; createdAt: Date };

  @Prop([{ portfolio: { type: MongooseSchema.Types.ObjectId, ref: 'Portfolio' }, createdAt: Date }])
  portfolios: { portfolio: any; createdAt: Date }[];

  @Prop([{ name: String, link: String }])
  socialNetworks: { name: string; link: string }[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ 'location.geoLocation': '2dsphere' });
