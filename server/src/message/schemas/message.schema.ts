    import { Date, HydratedDocument, Types } from "mongoose";
    import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
    import { User } from "src/user/schemas/user.schema";

    export type MessageDocument = HydratedDocument<Message>;
    @Schema()
    export class Message {
        @Prop({ required: true,
            type: Types.ObjectId
        }) 
        sender_id: Types.ObjectId; 
      
        @Prop({ required: true,
            type: Types.ObjectId,
            ref: User.name
        })
        receive_id: Types.ObjectId; 
      
        @Prop({
          required: true,
        })
        message: string;
      
        @Prop({ type: Date, default: Date.now })
        timestamp: Date
    }

    export const MessageSchema = SchemaFactory.createForClass(Message);

