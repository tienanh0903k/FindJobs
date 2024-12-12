import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type FollowerDocument = Follower & Document;

@Schema()
export class Follower {
  @Prop({ type: String, ref: 'User', required: true })
  userId: string;

  @Prop({ type: String, ref: 'Companies', required: true }) 
  companyId: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const FollowerSchema = SchemaFactory.createForClass(Follower);
