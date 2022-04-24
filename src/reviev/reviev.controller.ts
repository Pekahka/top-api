import {
	Controller,
	Body,
	Post,
	Param,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	UsePipes,
	ValidationPipe,
	UseGuards
} from '@nestjs/common';
import { IdValidationPipe } from 'src/pipes/id-validation.pipes';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserEmail } from '../decorators/user-email.decorator';
import { CreateRevievDto } from './dto/create-reviev.dto';
import { REVIEV_NOT_FOUND } from './reviev.constants';
import { RevievService } from './reviev.service';

@Controller('reviev')
export class RevievController {
	constructor(private readonly revievService: RevievService) { }

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateRevievDto) {
		return this.revievService.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedDoc = await this.revievService.delete(id);
		if (!deletedDoc) {
			throw new HttpException(REVIEV_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	// @UseGuards(JwtAuthGuard)
	@Get('byProduct/:productId')
	async getByProduct(@Param('productId', IdValidationPipe) productId: string, @UserEmail() email: string) {
		console.log(email);
		return this.revievService.findByProductId(productId);
	}
}
