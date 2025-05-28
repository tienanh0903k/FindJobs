import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Companies } from './schemas/company.schema';
import { Model } from 'mongoose';
import { UploadsService } from '../uploads/uploads.service';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Companies.name) private companyModels: Model<Companies>,
    private readonly uploadsService: UploadsService,
  ) {}

  //get company for home random
  async findAllCompanyHome(limit: number = 8) {
    const filter = { status: 1 };
    const randomCompanies = await this.companyModels.aggregate([
      { $match: filter },
      { $sample: { size: limit } },
    ]);
    return randomCompanies;
  }


  //get all companies for select 
  async getALL() {
    return this.companyModels.find({});
  }

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
      createCompanyDto.logo = imageUrl;
    }
    //console.log('createCompanyDto:', createCompanyDto);
    const result = this.companyModels.create(createCompanyDto);
    return result;
  }

  //get pagination companies
  async findAll(paginationQuery: PaginationQueryDto) {
    const { page = 1, limit = 10, status = 1 } = paginationQuery;
    const skip = (page - 1) * limit;

    // Tạo bộ lọc cho truy vấn
    const filter = { status };

    const companies = await this.companyModels
      .find(filter) // Có thể thêm các bộ lọc vào đây
      .skip(skip) // Bỏ qua một số tài liệu dựa trên trang
      .limit(limit) // Giới hạn số lượng tài liệu trả về
      .exec();

    const total = await this.companyModels.countDocuments(filter);

    return {
      items: companies,
      total, // Tổng số tài liệu
      page, // Trang hiện tại
      limit, // Số lượng tài liệu trên mỗi trang
      totalPages: Math.ceil(total / limit), // Tổng số trang
    };
  }

  //update
  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
    image?: Express.Multer.File,
  ) {
    let imageUrl: string | undefined;

    if (image) {
      try {
        imageUrl = await this.uploadsService.uploadFile('companies', {
          file: image,
          fileName: image.originalname,
        });
      } catch (error) {
        console.error('Error uploading image:', error);
        throw new BadRequestException('Failed to upload image');
      }
    }

    if (imageUrl) {
      updateCompanyDto.logo = imageUrl;
    }

    const company = await this.companyModels
      .findByIdAndUpdate(
        id,
        { $set: updateCompanyDto },
        { new: true, runValidators: true },
      )
      .exec();

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return company;
  }

  async findOneCompany(id: string) {
    return this.companyModels.findById(id);
  }

  /**
   * Removes a company by ID.
   * @param id - The ID of the company to remove.
   * @returns The deleted company document.
   * @throws NotFoundException if company is not found.
   */
  async remove(id: string) {
    const company = await this.companyModels.findByIdAndDelete(id).exec();
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return company;
  }
}
