import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types  } from 'mongoose';

export type RolesDocument = HydratedDocument<Roles>;

@Schema({ timestamps: true })
export class Roles {
    @Prop({ required: true, unique: true })
    name: string;  // Tên vai trò, ví dụ: 'admin', 'hr', 'candidate'

    @Prop({type: Boolean, default: true})
    isActive: string;

    //1 mang permission
    @Prop({type: [{type: Types.ObjectId, 
        ref: 'Permission'
    }]})
    permissions: Types.ObjectId[];

   
}

export const UserSchema = SchemaFactory.createForClass(Roles);
