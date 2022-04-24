import { Type } from 'class-transformer';
import { IsNumber, IsString, IsOptional, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { TopLevelCategory } from '../top-page.model';

export class DOUDataDto {
	@IsNumber()
	count: number;

	@IsNumber()
	juniorSalary: number;

	@IsNumber()
	middleSalary: number;

	@IsNumber()
	seniorSalary: number;
}

export class TopPageAdvantageDto {

	@IsString()
	title: string;

	@IsString()
	description: string;
}


export class CreateTopPageDto {

	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;

	@IsString()
	alias: string;

	@IsString()
	secondCategory: string;

	@IsString()
	title: string;

	@IsString()
	category: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => DOUDataDto)
	dou?: DOUDataDto;

	@IsArray()
	@ValidateNested()
	@Type(() => TopPageAdvantageDto)
	advantages: TopPageAdvantageDto[];

	@IsString()
	seoText: string;

	@IsOptional()
	@IsString()
	tagsTitle?: string;

	@IsArray()
	@IsString({ each: true })
	tags: string[];
}