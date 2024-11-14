import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Resume } from './schemas/resume.schema';
import { Model } from 'mongoose';
import { UploadsService } from '../uploads/uploads.service';

@Injectable()
export class ResumeService {
  constructor(
    @InjectModel(Resume.name) private resumeModel: Model<Resume>,
    private readonly uploadsService: UploadsService,
  ) {}


  async uploadResume(file: Express.Multer.File, resumeData: {
    candidateId: string;
    jobId: string;
    coverLetter: string;
  }) {
    if (!['application/pdf', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        .includes(file.mimetype)) {
      throw new BadRequestException('Chỉ chấp nhận file PDF hoặc DOCX');
    }

    const fileUrl = await this.uploadsService.uploadFile('resumes', {
      file,
      fileName: file.originalname,
    });

    const newResume = new this.resumeModel({
      candidateId: resumeData.candidateId,
      jobId: resumeData.jobId,
      resume: fileUrl, 
      coverLetter: resumeData.coverLetter,
      status: 'pending',
      appliedAt: new Date(), 
    });

    return newResume.save();
  }
}
