import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  userName: string; 

  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
  })
  role: string


  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop({
    default: Date.now,
  })
  create_at: Date;

  @Prop({
    default: Date.now,
    update: Date.now,
  })
  update_at: Date;

  @Prop({
    type: [
      {
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
      },
    ],
    default: [],
  })
  education: {
    institution: string;
    degree: string;
    startDate: Date;
    endDate: Date;
  }[];

  @Prop({
    type: [
      {
        companyName: { type: String, required: true },
        position: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
      },
    ],
    default: [],
  })
  workExperience: {
    companyName: string;
    position: string;
    startDate: Date;
    endDate: Date;
  }[];

  @Prop({
    type: [String],
    default: [],
  })
  skills: string[];

  @Prop({
    type: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    default: [],
  })
  projects: {
    title: string;
    description: string;
  }[];

  @Prop({
    type: [
      {
        name: { type: String, required: true },
        issuedDate: { type: Date, required: true },
      },
    ],
    default: [],
  })
  certifications: {
    name: string;
    issuedDate: Date;
  }[];

  @Prop({
    type: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        awardedDate: { type: Date, required: true },
      },
    ],
    default: [],
  })
  awards: {
    title: string;
    description: string;
    awardedDate: Date;
  }[];
}

export const UserSchema = SchemaFactory.createForClass(User);
