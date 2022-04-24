import { prop, types } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose'

export interface RevievModel extends Base { }

export class RevievModel extends TimeStamps {

	@prop()
	name: string;

	@prop()
	title: string;

	@prop()
	description: string;

	@prop()
	rating: number;

	@prop()
	productId: Types.ObjectId;

}
