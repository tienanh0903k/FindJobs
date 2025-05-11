import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Resume } from './schemas/resume.schema';
import { Model } from 'mongoose';
import { UploadsService } from '../uploads/uploads.service';
// import { OpenAI } from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ResumeService {
  // private openai: OpenAI;

  // constructor(
  //   @InjectModel(Resume.name) private resumeModel: Model<Resume>,
  //   private readonly uploadsService: UploadsService,
  //   private readonly configService: ConfigService,
  // ) {
  //   this.openai = new OpenAI({
  //     apiKey: this.configService.get<string>('OPENAI_API_KEY'),
  //   });
  // }



  constructor(
    @InjectModel(Resume.name) private resumeModel: Model<Resume>,
    private readonly uploadsService: UploadsService,
    private readonly configService: ConfigService,
  ) {
    
  }

  async uploadResume(
    file: Express.Multer.File,
    resumeData: {
      candidateId: string;
      jobId: string;
      coverLetter: string;
    },
  ) {
    if (
      ![
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ].includes(file.mimetype)
    ) {
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

  //chat box review cv
  // async analyze(file?: Express.Multer.File, message: string = '') {
  //   let fileText = '';

  //   if (file) {
  //     const buffer = await fs.readFile(file.path);

  //     if (file.originalname.endsWith('.pdf')) {
  //       const parsed = await pdfParse(buffer);
  //       fileText = parsed.text;
  //     } else {
  //       fileText = buffer.toString('utf-8');
  //     }
  //   }

  //   const fullPrompt =
  //     `${fileText ? `--- CV ---\n${fileText.trim()}` : ''}\n\n${
  //       message ? `--- Tin nhắn ---\n${message.trim()}` : ''
  //     }`.trim();

  //   if (!fullPrompt) {
  //     throw new BadRequestException('Không có nội dung để phân tích.');
  //   }

  //   try {
  //     const response = await this.openai.chat.completions.create({
  //       model: 'gpt-3.5-turbo',
  //       messages: [
  //         {
  //           role: 'system',
  //           content:
  //             'Bạn là chuyên gia tuyển dụng. Phân tích nội dung bên dưới: nêu rõ điểm mạnh, điểm yếu và gợi ý cải thiện.',
  //         },
  //         {
  //           role: 'user',
  //           content: fullPrompt,
  //         },
  //       ],
  //     });

  //     return {
  //       analysis: response.choices[0].message?.content,
  //     };
  //   } catch (error) {
  //     if (error.status === 429) {
  //       throw new BadRequestException(
  //         'Bạn đã vượt quá giới hạn sử dụng OpenAI API. Vui lòng kiểm tra tài khoản hoặc thử lại sau.',
  //       );
  //     }

  //     console.error('OpenAI error:', error);
  //     throw new BadRequestException('Lỗi khi phân tích CV.');
  //   }
  // }

  // async analyze(file?: Express.Multer.File, message: string = '') {
  //   let fileText = '';

  //   if (file) {
  //     const buffer = await fs.readFile(file.path);

  //     if (file.originalname.endsWith('.pdf')) {
  //       const parsed = await pdfParse(buffer);
  //       fileText = parsed.text;
  //     } else {
  //       fileText = buffer.toString('utf-8');
  //     }
  //   }

  //   const fullPrompt =
  //     `${fileText ? `--- CV ---\n${fileText.trim()}` : ''}\n\n${
  //       message ? `--- Tin nhắn ---\n${message.trim()}` : ''
  //     }`.trim();

  //   if (!fullPrompt) {
  //     throw new BadRequestException('Không có nội dung để phân tích.');
  //   }

  //   try {
  //     const response = await axios.post(
  //       this.geminiApiUrl, // API endpoint của Gemini
  //       {
  //         messages: [
  //           {
  //             role: 'system',
  //             content:
  //               'Bạn là chuyên gia tuyển dụng. Phân tích nội dung bên dưới: nêu rõ điểm mạnh, điểm yếu và gợi ý cải thiện.',
  //           },
  //           {
  //             role: 'user',
  //             content: fullPrompt,
  //           },
  //         ],
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${this.geminiApiKey}`,
  //         },
  //       },
  //     );

  //     return {
  //       analysis: response.data.choices[0]?.message?.content,
  //     };
  //   } catch (error) {
  //     if (error.response?.status === 429) {
  //       throw new BadRequestException(
  //         'Bạn đã vượt quá giới hạn sử dụng Gemini API. Vui lòng kiểm tra tài khoản hoặc thử lại sau.',
  //       );
  //     }

  //     console.error('Gemini API error:', error);
  //     throw new BadRequestException('Lỗi khi phân tích CV.');
  //   }
  // }
}
