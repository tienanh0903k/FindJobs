import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Application } from './schemas/application.schema';
import { Model } from 'mongoose';
import { UploadsService } from '../uploads/uploads.service';

@Injectable()
export class ApplicationService {
    constructor(
        @InjectModel(Application.name) private applicationModel: Model<Application>,
        private readonly uploadsService: UploadsService,
      ) {}

      async uploadApplication(file: Express.Multer.File, applicationData) {
        if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.mimetype)) {
          throw new BadRequestException('Chỉ chấp nhận file PDF hoặc DOCX');
        }
    
        // Tải file lên S3 và lấy URL
        const fileUrl = await this.uploadsService.uploadFile('resumes', {
          file,
          fileName: file.originalname,
        });
    
        const newApplication = new this.applicationModel({
          userId: applicationData.userId,
          email: applicationData.email,
          name: applicationData.name,
          jobId: applicationData.jobId,
          resume_url: fileUrl,
          coverLetter: applicationData.coverLetter,
          status: 'pending',
        });

        return newApplication.save();
      }
}
