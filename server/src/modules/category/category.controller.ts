import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  async createCategory(@Body() createCategoryDto: any): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Post('bulk')
  async bulkCreate(@Body() categories: CreateCategoryDto[]) {
    return this.categoryService.bulkCreate(categories);
  }

  @Get()
  async findAllCategories() {
    return this.categoryService.findAllCategories();
  }

  @Get(':id')
  async findCategoryById(@Param('id') id: string) {
    return this.categoryService.findCategoryById(id);
  }
}
