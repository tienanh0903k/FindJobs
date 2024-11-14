import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ApplicationDocument = HydratedDocument<Application>;

@Schema()
export class Application {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'JobListing', required: true })
  jobId: Types.ObjectId;

  @Prop({ type: String, required: true })
  resume_url: string;

  @Prop({ type: String })
  coverLetter: string;

  @Prop({
    type: String,
    enum: ['pending', 'interview', 'rejected', 'hired'],
    default: 'pending',
  })
  status: string;

  @Prop({ type: Date, default: Date.now })
  appliedAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}
export const ApplicationSchema = SchemaFactory.createForClass(Application);
