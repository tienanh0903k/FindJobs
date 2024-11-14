import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApplicationService } from './application.service';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadResume(
    @UploadedFile() file: Express.Multer.File,
    @Body()
    resumeData: {
      candidateId: string;
      jobId: string;
      coverLetter: string;
    },
  ) {
    if (!file) {
      throw new BadRequestException('File không được để trống');
    }
    if (
      ![
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ].includes(file.mimetype)
    ) {
      throw new BadRequestException('Chỉ chấp nhận file PDF hoặc DOCX');
    }

    return await this.applicationService.uploadApplication(file, resumeData);
  }
}
