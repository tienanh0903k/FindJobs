import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApplicationService } from './application.service';
import { CreateApplocationDto } from './dto/create-application.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ResponseMessage } from '../auth/decorator/response_message.decorator';

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



  @Get()
  @UseGuards(AuthGuard)
  async getApplications(
    @Req() req: any,
    @Query('searchTerm') searchTerm: string = '',
    @Query('status') status?: string
  ) {
    try {
      console.log('getApplications running...')  
      // Gọi hàm getApplicationsByHR từ service
      const applications = await this.applicationService.getApplicationsByHR(req.user.sub, searchTerm, status);

      // Trả kết quả cho client
      return { applications };
    } catch (error) {
      throw new ForbiddenException('Bạn không có đơn ứng tuyển.');
    }
  }



  @Post()
  async createApplication(@Body() data: CreateApplocationDto) {
    try {
      return await this.applicationService.createApplication(data);
    } catch (error) {
       console.error('Error creating application:', error);
        throw new HttpException('Error creating application', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }




  @Put()
  @ResponseMessage("Cap nhat thanh cong")
  async updateApplication(@Body() data: any) {
    try {
      console.log(data)
      return await this.applicationService.updateApplication(data.id, data.status);
    } catch (error) {
      console.error('Error updating application:', error);
      throw new HttpException('Error updating application', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
