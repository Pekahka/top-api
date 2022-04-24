import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { RevievController } from './reviev.controller';
import { RevievModel } from './reviev.model';
import { RevievService } from './reviev.service';

@Module({
  controllers: [RevievController],
  imports: [
    TypegooseModule.forFeature([{

      typegooseClass: RevievModel,
      schemaOptions: {
        collection: 'Reviev'
      }

    }
    ])
  ],
  providers: [RevievService]
})
export class RevievModule { }
