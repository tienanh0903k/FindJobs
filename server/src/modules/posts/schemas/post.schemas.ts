
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
    @Prop({ required: true })
    position: string; // Tên vị trí

    @Prop({ required: true })
    description: string; // Mô tả công việc

    @Prop({ required: true })
    requirements: string; // Các yêu cầu

    @Prop({ required: true })
    companyName: string; // Tên công ty

    @Prop({ required: true })
    location: string; // Địa điểm

    @Prop({ required: true })
    salary: string; // Mức lương

    @Prop({ required: true })
    workingHours: string; // Giờ làm việc

    @Prop({ required: true })
    deadline: Date; // Ngày hết hạn

    @Prop({ required: true })
    contactInfo: string; // Thông tin liên hệ

    @Prop({ required: true })
    status: string; // Trạng thái

    @Prop({ required: true })
    postedDate: Date; // Ngày đăng

    @Prop({ required: true })
    experience: string; // Kinh nghiệm (ví dụ: "2 năm")

    @Prop({ required: true })
    numberOfPositions: number; // Số lượng vị trí (ví dụ: 3)

    @Prop({ type: [String], required: true })
    tags: string[]; // Tag liên quan đến công việc

    @Prop({ default: false }) // Mặc định là false
    isHot: boolean; // T


    @Prop({ required: true, ref: 'Companies', type: Types.ObjectId })
    companyId: Types.ObjectId;

    @Prop({ required: true })
    userId: string; 

}

export const PostSchemas = SchemaFactory.createForClass(Post);
