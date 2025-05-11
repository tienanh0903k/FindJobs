import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: false })
  userName: string;

  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    required: false,
  })
  password: string;

  // @Prop({
  //   required: true,
  // })
  // role: string;
  
  @Prop({
    type: Types.ObjectId,
    ref: 'Roles',
    required: true,
  })
  role: Types.ObjectId;

  @Prop({
    type: String,
  })
  avatar: string;

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
        position: { type: String, required: false },
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

  @Prop({
    required: false,
  })
  position: string;

  @Prop({
    required: false,
  })
  fullName: string;

  @Prop({
    required: false,
  })
  introduction: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Companies',
    required: false,
  })
  companyId: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
