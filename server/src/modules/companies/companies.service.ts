import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Companies } from './schemas/company.schema';
import { Model } from 'mongoose';
import { UploadsService } from '../uploads/uploads.service';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Companies.name) private companyModels: Model<Companies>,
    private readonly uploadsService: UploadsService,
  ) {}

  async create(
    createCompanyDto: CreateCompanyDto,
    image?: Express.Multer.File,
  ) {
    console.log('image', image);
    let imageUrl: string | undefined;
    if (image) {
      try {
        imageUrl = await this.uploadsService.uploadFile('companies', {
          file: image,
          fileName: image.originalname,
        });
        //console.log('imageUrl', imageUrl); 
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    if (imageUrl) {
      createCompanyDto.image = imageUrl;
    }
    //console.log('createCompanyDto:', createCompanyDto);
    const result = this.companyModels.create(createCompanyDto);
    return result
  }


  //get pagination companies
  async findAll(paginationQuery: PaginationQueryDto) {
    const { page = 1, limit = 10 } = paginationQuery;
    const skip = (page - 1) * limit;
    const companies = await this.companyModels
      .find() // Có thể thêm các bộ lọc vào đây
      .skip(skip) // Bỏ qua một số tài liệu dựa trên trang
      .limit(limit) // Giới hạn số lượng tài liệu trả về
      .exec();

    const total = await this.companyModels.countDocuments();

    return {
      items: companies,
      total, // Tổng số tài liệu
      page, // Trang hiện tại
      limit, // Số lượng tài liệu trên mỗi trang
      totalPages: Math.ceil(total / limit), // Tổng số trang
    };
  }


  findOne(id: number) {
    return `This action returns a #${id} company`;
  }



  // update(id: number, updateCompanyDto: UpdateCompanyDto) {
  //   return `This action updates a #${id} company`;
  // }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
