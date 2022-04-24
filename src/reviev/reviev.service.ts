import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { CreateRevievDto } from './dto/create-reviev.dto';
import { RevievModel } from './reviev.model';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';



@Injectable()
export class RevievService {
	constructor(@InjectModel(RevievModel) private readonly revievModel: ModelType<RevievModel>) { }

	async create(dto: CreateRevievDto): Promise<DocumentType<RevievModel>> {
		return this.revievModel.create(dto);
	}


	async delete(id: string): Promise<DocumentType<RevievModel> | null> {
		return this.revievModel.findByIdAndDelete(id).exec();
	}

	async findByProductId(productId: string): Promise<DocumentType<RevievModel>[]> {
		return this.revievModel.find({ productId: new Types.ObjectId(productId) }).exec();
	}

	async deleteByProductId(productId: string) {
		return this.revievModel.deleteMany({ productId: new Types.ObjectId(productId) }).exec();
	}
}
