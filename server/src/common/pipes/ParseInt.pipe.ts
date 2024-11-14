import { ParseIntPipe } from '@nestjs/common';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('items')
export class ItemsController {
  @Get(':id')
  getItem(@Param('id', ParseIntPipe) id: number) {
    return `Item ID is ${id}`;
  }
}
