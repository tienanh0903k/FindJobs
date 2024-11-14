import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompaniesDocument = HydratedDocument<Companies>;

@Schema()
export class Companies {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: String })
  coordinates: string;

  @Prop({ type: Number, default: 0 })
  followers: number;

  @Prop({ type: Number, default: 0 })
  rating: number;

  @Prop({ type: Number, default: 0 })
  total_employee: number;

  @Prop({ type: String })
  image: string;
}

export const CompaniesSchema = SchemaFactory.createForClass(Companies);
