import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema(
    {
        timestamps: true,
    },
)
export class Post {
  @Prop({ required: true })
  position: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  requirements: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  salary: string;

  @Prop({ required: false })
  workingHours: string;

  @Prop({ required: true })
  deadline: Date;

  @Prop({ type: [String], ref: 'Category', default: [] })
  categories: string[];

  @Prop({ required: false })
  contactInfo: string;

  @Prop({ required: false })
  status: boolean;

  experience: string;

  @Prop({ required: true })
  numberOfPositions: number;

  @Prop({ type: [String], required: true })
  tags: string[];

  @Prop({ default: false })
  isHot: boolean;

   @Prop({ default: false })
  isUrgent: boolean;

//   @Prop({ required: false, ref: 'Companies', type: Types.ObjectId })
//   companyId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
  userId: Types.ObjectId;
}

export const PostSchemas = SchemaFactory.createForClass(Post);
