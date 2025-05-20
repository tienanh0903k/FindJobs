import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction extends Document {
  @Prop() userId: string;
  @Prop() amount: number;
  @Prop() type: string; // 'deposit'
  @Prop() provider: string; // 'zalopay'
  @Prop() status: string; // 'pending', 'success', 'failed'
  @Prop() orderId: string; // app_trans_id
  @Prop({ type: Object }) raw: any;
  @Prop() createdAt: Date;
  @Prop() updatedAt: Date;
}
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
