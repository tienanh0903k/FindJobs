import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ResumeDocument = HydratedDocument<Resume>;

@Schema()
export class Resume {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  candidateId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'JobListing', required: true })
  jobId: Types.ObjectId;

  @Prop({ type: String, required: true })
  resume: string; 

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
export const ResumeSchema = SchemaFactory.createForClass(Resume);
