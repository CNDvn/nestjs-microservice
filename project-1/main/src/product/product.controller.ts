import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices/decorators';
import { HttpService } from '@nestjs/axios/dist';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  async all() {
    return this.productService.all();
  }

  @Post(':id/like')
  async like(@Param('id') id: number) {
    const product = await this.productService.get(id);

    this.httpService
      .post(`http://localhost:8000/api/products/${id}/like`, {})
      .subscribe((_res) => {});

    return this.productService.update(id, {
      likes: product.likes + 1,
    });
  }

  @EventPattern('product_created')
  async create(product: any) {
    this.productService.create(product);
  }

  @EventPattern('product_updated')
  async update(product: any) {
    this.productService.update(product.id, product);
  }

  @EventPattern('product_deleted')
  async delete(id: number) {
    this.productService.delete(id);
  }
}
