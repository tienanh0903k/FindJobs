import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseData } from 'src/common/dtos/response.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

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


  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
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
