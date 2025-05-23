
    import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
    import { HydratedDocument, Types } from 'mongoose';

    export type PostDocument = HydratedDocument<Post>;

    @Schema()
    export class Post {
        @Prop({ required: true })
        position: string; 

        @Prop({ required: true })
        description: string; 

        @Prop({ required: false })
        requirements: string; 

        @Prop({ required: false })
        companyName: string; 

        @Prop({ required: true })
        location: string; 

        @Prop({ required: true })
        salary: string; 

        @Prop({ required: false })
        workingHours: string; 

        @Prop({ required: true })
        deadline: Date; 

        @Prop({ required: false })
        contactInfo: string; 

        @Prop({ required: false })  
        status: boolean; 

        // @Prop({ required: true })
        // postedDate: Date; 

        // @Prop({ required: true })
        experience: string; 

        @Prop({ required: true })
        numberOfPositions: number;

        @Prop({ type: [String], required: true })
        tags: string[]; 

        @Prop({ default: false })
        isHot: boolean; 

        @Prop({ required: false, ref: 'Companies', type: Types.ObjectId })
        companyId: Types.ObjectId;

        @Prop({ required: false })
        userId: string; 

    }

    export const PostSchemas = SchemaFactory.createForClass(Post);
