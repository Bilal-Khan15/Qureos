import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get('/search')
    public getBooks(@Query() query) {
        return this.bookService.getBooks(query);
    }

    @Post()
    public async postBooks(@Body() input: {url?: string}) {
        return await this.bookService.postBooks(input?.url);
    }
}
