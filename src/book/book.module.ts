import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookSchema } from './schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Book',
        schema: BookSchema
      }
    ]),
    HttpModule
  ],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
