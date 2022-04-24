import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { RevievModel } from 'src/reviev/reviev.model';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './product.model';

@Injectable()
export class ProductService {
	constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) { }

	async create(dto: CreateProductDto) {
		return this.productModel.create(dto);
	}

	async findById(id: string) {
		return this.productModel.findById(id).exec();
	}

	async deleteById(id: string) {
		return this.productModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, dto: CreateProductDto) {
		return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async findWithRevievs(dto: FindProductDto) {
		return this.productModel.aggregate([
			{
				$match: {
					categories: dto.category
				}
			},

			{
				$sort: {
					_id: 1
				}
			},

			{
				$limit: dto.limit
			},

			{
				$lookup: {
					from: 'Reviev',
					localField: '_id',
					foreignField: 'productId',
					as: 'reviev'
				}
			},

			{
				$addFields: {
					revievCount: { $size: '$reviev' },
					revievAvg: { $avg: '$reviev.rating' },
					reviev: {
						$function: {
							body: `function (reviev) {
								reviev.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
								return reviev;
							}`,
							args: ['$reviev'],
							lang: 'js'
						}
					}
				}
			}
		]).exec() as Promise<(ProductModel & { reviev: RevievModel[], revievCount: number, revievAvg: number })[]>;
	}
}
