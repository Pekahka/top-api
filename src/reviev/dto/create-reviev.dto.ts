import { IsString, IsNumber, Max, Min } from 'class-validator';


export class CreateRevievDto {

	@IsString()
	name: string;

	@IsString()
	title: string;

	@IsString()
	description: string;

	@Max(5)
	@Min(1, { message: 'Ну для тупых же написано не меньше 1!' })
	@IsNumber()
	rating: number;

	@IsString()
	productId: string;
}