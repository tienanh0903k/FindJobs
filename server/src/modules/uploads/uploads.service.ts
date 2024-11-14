import { Injectable } from '@nestjs/common';
// import { CreateUploadDto } from './dto/create-upload.dto';
// import { UpdateUploadDto } from './dto/update-upload.dto';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable() 
export class UploadsService {
  private s3: S3Client;
  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_S3_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_S3_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('AWS_S3_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadFile(
    path: string,
    {
      file,
      fileName,
    }: {
      file: Express.Multer.File;
      fileName: string;
    },
  ) {
    const bucket_name = this.configService.get<string>('AWS_S3_PUBLIC_BUCKET');
    const key = `${path}/${Date.now().toString()}-${fileName}`;
    await this.s3.send(
      new PutObjectCommand({
        Bucket: bucket_name,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
        ContentLength: file.size,
      }),
    );
     
    return `https://${bucket_name}.s3.amazonaws.com/${key}`;
  }
}
