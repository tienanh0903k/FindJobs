import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseData } from 'src/common/dtos/response.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  //getting companies for home
  @Get('home')
  async getRandomCompanies(@Query('limit') limit?: string) {
    // Parse limit nếu được truyền, default là 8
    const lim = limit ? parseInt(limit, 10) : 8;
    return this.companiesService.findAllCompanyHome(lim);
  }

  @Get()
  async getAllCompanies() {
    return this.companiesService.getALL();
  }

  @Post()
  // @Roles('ADMIN')
  // @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const result = await this.companiesService.create(createCompanyDto, image);
    return new ResponseData(200, 'Thêm mới thành công', result, null);
  }

  /**
   * Update a company by ID.
   * @param id - The ID of the company.
   * @param updateCompanyDto - The updated company details.
   * @param file - Optional image file for the company.
   * @returns The updated company.
   */
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.companiesService.update(id, updateCompanyDto, file);
  }

  /**
   * Delete a company by ID.
   * @param id - The ID of the company.
   * @returns The deleted company.
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.companiesService.remove(id);
  }

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    console.log('paginationQuery', paginationQuery);
    return this.companiesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOneCompany(id);
  }

  //get companies by name
  // @Get('top')
  // findTopCompany() {
  //   return this.companiesService.getCompaniesHome();
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
  //   return this.companiesService.update(+id, updateCompanyDto);
  // }
}
