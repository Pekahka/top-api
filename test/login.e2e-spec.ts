import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';

const loginDto: AuthDto = {
	login: 'a2@a.ua',
	password: '1'
};


describe('AuthController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();



	});

	it('/auth/login (POST)', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.acces_token).toBeDefined();
			});
	});


	it('/auth/login (POST) - fail pass', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ login: 'a2@a.ua', password: '22' })
			.expect(401, {
				statusCode: 401,
				message: "Wrong password",
				error: "Unauthorized"
			});
	});

	it('/auth/login (POST) - fail email', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, login: 'aaa@a.ua' })
			.expect(401, {
				statusCode: 401,
				message: "User not found",
				error: "Unauthorized"
			});
	});





	afterAll(() => {
		disconnect();
	});
});
