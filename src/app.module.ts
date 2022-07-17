import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    BookModule,
    MongooseModule.forRoot('mongodb://localhost/book_manager')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
