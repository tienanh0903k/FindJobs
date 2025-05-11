import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { FileInterceptor } from '@nestjs/platform-express';
import pdfParse from 'pdf-parse';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

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

    return await this.resumeService.uploadResume(file, resumeData);
  }

  // @Post('analyze')
  // @UseInterceptors(FileInterceptor('file'))
  // async analyze(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body('message') message: string,
  // ) {
  //   // Nếu không có file và không có text luôn
  //   if (!file && (!message || !message.trim())) {
  //     throw new BadRequestException('Phải gửi ít nhất một trong hai: file hoặc tin nhắn');
  //   }

  //   return this.resumeService.analyze(file, message || '');
  // }

  @Post('pdf')
  @UseInterceptors(FileInterceptor('file')) 
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      // Lấy buffer của file đã upload
      const fileBuffer = file.buffer;

      // Xử lý tệp PDF và trích xuất văn bản
      const parsedPdf = await pdfParse(fileBuffer);
      const text = parsedPdf.text; // Trích xuất văn bản từ PDF

      console.log('Parsed text:', text); // In ra văn bản đã trích xuất

      // Trả về kết quả dưới dạng JSON
      return { text };
    } catch (error) {
      console.error(error);
      throw new Error('Đã có lỗi xảy ra khi xử lý tệp.');
    }
  }
}
