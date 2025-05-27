import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
    @Prop({
        type: String
    })
    _id?: string;
    @Prop({
        required: true,
        unique: true,
        trim: true,
    })
    name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
