import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './product.model';
import { ProductController } from './product.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    HttpModule,
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
