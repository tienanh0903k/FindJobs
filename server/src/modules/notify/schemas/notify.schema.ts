import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


@Schema()
export class Notify  {
    @Prop({ required: true })
    userId: string;  

    @Prop({ required: true })
    applicationId: string;
  
    @Prop({ required: true })
    message: string;  

    @Prop({ required: true })
    isRead: boolean;
  
    @Prop({ default: Date.now })
    createdAt: Date;  
}

export type NotifyDocument = HydratedDocument<Notify>;

export const NotifySchema = SchemaFactory.createForClass(Notify)