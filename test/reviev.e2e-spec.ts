import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateRevievDto } from 'src/reviev/dto/create-reviev.dto';
import { Types, disconnect } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';

const productId = new Types.ObjectId().toHexString();

const loginDto: AuthDto = {
	login: 'a2@a.ua',
	password: '1'
};

const testDto: CreateRevievDto = {
	name: 'test',
	title: 'title',
	description: 'description',
	rating: 5,
	productId
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;
	let token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();


		const { body } = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto);
		token = body.acces_token;
	});

	it('/reviev/create (POST)', () => {
		return request(app.getHttpServer())
			.post('/reviev/create')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
			});
	});

	it('/reviev/create (POST) - fail', () => {
		return request(app.getHttpServer())
			.post('/reviev/create')
			.send({ ...testDto, rating: 0 })
			.expect(400)
			.then(({ body }: request.Response) => {
			});
	});


	it('/review/byProduct/:productId (GET) - success', () => {
		return request(app.getHttpServer())
			.get('/reviev/byProduct/' + productId)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(1);
			});
	});

	it('/review/byProduct/:productId (GET) - fail', () => {
		return request(app.getHttpServer())
			.get('/reviev/byProduct/' + new Types.ObjectId().toHexString())
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(0);
			});
	});

	it('/reviev/:id (DEL)', () => {
		return request(app.getHttpServer())
			.delete('/reviev/' + createdId)
			.set('Authorization', 'Bearer ' + token)
			.then(() => {
				expect(200);
			});
	});




	afterAll(() => {
		disconnect();
	});
});
