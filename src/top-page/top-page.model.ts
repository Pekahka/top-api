import { prop, index } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export class DOUData {

	@prop()
	count: number;

	@prop()
	juniorSalary: number;

	@prop()
	middleSalary: number;

	@prop()
	seniorSalary: number;
}

export class TopPageAdvantage {
	@prop()
	title: string;

	@prop()
	description: string;
}

export interface TopPageModel extends Base { }

@index({ "$**": 'text' })
export class TopPageModel extends TimeStamps {

	@prop({ enum: TopLevelCategory })

	@prop()
	firstCategory: TopLevelCategory;

	@prop({ unique: true })
	alias: string;

	@prop()
	secondCategory: string;

	@prop()
	title: string;

	@prop()
	category: string;

	@prop({ type: () => DOUData })
	dou?: DOUData;

	@prop({ type: () => [TopPageAdvantage] })
	advantages: TopPageAdvantage[];

	@prop()
	seoText: string;

	@prop()
	tagsTitle?: string;

	@prop({ type: () => [String] })
	tags: string[];
}
