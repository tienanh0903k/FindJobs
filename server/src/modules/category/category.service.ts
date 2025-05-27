import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<Category>,
    ) {}


    async createCategory(createCategoryDto: any): Promise<Category> {
        const createdCategory = new this.categoryModel(createCategoryDto);
        return createdCategory.save();
    }

    async bulkCreate(categories: CreateCategoryDto[]) {
        // Nếu dùng _id custom thì set _id = id
        const docs = categories.map(c => ({
          _id: c.id || undefined, // nếu muốn custom id string
          name: c.name,
        }));
        return this.categoryModel.insertMany(docs);
      }

    async findAllCategories() {
        return this.categoryModel.find().exec();
    }

    async findCategoryById(id: string) {
        return this.categoryModel.findById(id).exec();
    }
}
