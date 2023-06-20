import { Product, ProductDocument, ProductSchema } from './product.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, mongo } from 'mongoose';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async all(): Promise<Product[]> {
    return this.productModel.find();
  }

  async get(id: number): Promise<Product> {
    return this.productModel.findOne({ id });
  }

  async create(data): Promise<Product> {
    return (await this.productModel.create(data)).save();
  }

  async update(id: number, data): Promise<any> {
    return this.productModel.updateOne({ id }, data);
  }

  async delete(id: number): Promise<any> {
    return this.productModel.deleteOne({ id });
  }
}
