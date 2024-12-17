import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Application } from './schemas/application.schema';
import { Model } from 'mongoose';
import { UploadsService } from '../uploads/uploads.service';
import { Post } from '../posts/schemas/post.schemas';
import { CreateApplocationDto } from './dto/create-application.dto';
import { NotifyDto } from '../notify/dto/create-notify.dto';
import { NotifyService } from '../notify/notify.service';
import { createClient } from 'redis';
// import { HttpService } from '@nestjs/axios';


@Injectable()
export class ApplicationService {
  private redisClient;
  constructor(
    @InjectModel(Application.name) private applicationModel: Model<Application>,
    @InjectModel(Post.name) private postsModel: Model<Post>,
    private readonly uploadsService: UploadsService,
    private readonly notifyService: NotifyService,
    // private readonlyhttpServiceHttpService
  ) {
    this.redisClient = createClient({ url: 'redis://localhost:6379' });
    this.redisClient.connect();
  }

  async uploadApplication(file: Express.Multer.File, applicationData) {
    if (
      ![
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ].includes(file.mimetype)
    ) {
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

  /**
   * GET: Lấy danh sách application bằng jobId va userId
   * @param userId
   * @param jobId
   * @returns
   */
  async getApplicationsByHR(
    hrUserId: string,
    searchTerm: string = '',
    status?: string,
  ) {
    // Truy vấn posts với userId là string
    const posts = await this.postsModel.find({ userId: hrUserId });
  
    console.log({
      hrUserId,
      searchTerm,
      status,
    });
    console.log('posts', posts);
  
    if (posts.length === 0) {
      throw new ForbiddenException('Bạn không có quyền xem các đơn ứng tuyển này.');
    }
  
    const jobIds = posts.map((post) => post._id.toString());
    console.log('JobIds', jobIds);
  
    const query: any = {
      jobId: { $in: jobIds },
    };
  
    if (searchTerm) {
      query['$or'] = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
      ];
    }
  
    if (status) {
      query.status = status;
    }
  
    const applications = await this.applicationModel
    .find(query)
    .populate({
      path: 'jobId',
      select: 'position ',
      model: 'Post',

    })
    ;
  
    return applications;
  //   {
  //     "applications": [
  //         {
  //             "_id": "6735e6d688957686bda0d054",
  //             "userId": "66c9fb96da1322f95d32885f",
  //             "email": "tienanh2003k@gmail.com",
  //             "name": "Tien ANh",
  //             "jobId": {
  //                 "_id": "671a6889f3ef7fe71c07d72c",
  //                 "position": "Junior React"
  //             },
  //             "resume_url": "https://cv-project-public-bucket.s3.amazonaws.com/resumes/1731585748816-anki-thống kê-2022-03-01@17-41-59.pdf",
  //             "coverLetter": "hi",
  //             "status": "pending",
  //             "appliedAt": "2024-11-14T12:02:30.460Z",
  //             "updatedAt": "2024-11-14T12:02:30.460Z",
  //             "__v": 0,
  //             "isSeen": true
  //         }
  //     ]
  // }
  }
  



  async createApplication(data: CreateApplocationDto) {
    const exist = await this.applicationModel.findOne({
      userId: data.userId,
      jobId: data.jobId
    })

    if (exist) {
      throw new HttpException('Hồ sơ đã tồn tại', HttpStatus.BAD_REQUEST)
    }
    const newApplication = new this.applicationModel(data);

    return newApplication.save();
    
  }



  async updateApplication(id: string, newStatus: string) {

  
    const application = await this.applicationModel.findOneAndUpdate(
      { _id: id},
      { status: newStatus },
      { new: true }
    );

    if (!application) {
      throw new HttpException('Application not found', HttpStatus.NOT_FOUND);
    }

    const notify: NotifyDto = {
      userId: application.userId.toString(), 
      applicationId: application._id.toString(),
      message: "Trạng thái của đơn ứng tuyển đã được cập nhật thành:" + newStatus,
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }


    await this.notifyService.createNotify(notify);

    const notificationMessage = { applicationId: application.id, userId:  application.userId,  notify: notify.message };

    await this.redisClient.publish('applicationStatusChanged', JSON.stringify(notificationMessage));

    return application;
  }





  //put application
}
