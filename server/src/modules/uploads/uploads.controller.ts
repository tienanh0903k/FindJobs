import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UploadsService } from './uploads.service';
// import { CreateUploadDto } from './dto/create-upload.dto';
// import { UpdateUploadDto } from './dto/update-upload.dto';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  // @Post()
  // create(@Body() createUploadDto: CreateUploadDto) {
  //   return this.uploadsService.create(createUploadDto);
  // }

  // @Get()
  // findAll() {
  //   return this.uploadsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.uploadsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
  //   return this.uploadsService.update(+id, updateUploadDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.uploadsService.remove(+id);
  // }
}
