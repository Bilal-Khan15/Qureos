import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBook } from './interfaces/book.interface';

const bookProjection = {
    __v: false,
    _id: false
}

@Injectable()
export class BookService {
    constructor(@InjectModel('Book') private readonly bookModel: Model<IBook>, private readonly httpService: HttpService) {}

    public getFindFilters(query) {
        let queryParams = {};

        if(query.title) {
            queryParams["title"] = { $regex : new RegExp(query.title, "i") };
        }

        if(query.isbn) {
            queryParams["isbn"] = { $regex : new RegExp(query.isbn, "i") };
        }

        if(query.pageCount) {
            queryParams["pageCount"] = Number(query.pageCount);
        }

        if(query.published) {
            queryParams["published"] = { $regex : new RegExp(query.published, "i") };
        }
    
        if(query.$date) {
            queryParams["published.$date"] = { $regex : query.$date };
        }
    
        if(query.date) {
            queryParams["published.$date"] = { $regex : query.date };
        }

        if(query.price) {
            queryParams["published.price"] = Number(query.price);
        }

        if(query.currency) {
            queryParams["published.currency"] = { $regex : new RegExp(query.currency, "i") };
        }

        if(query.thumbnailUrl) {
            queryParams["thumbnailUrl"] = { $regex : new RegExp(query.thumbnailUrl, "i") };
        }

        if(query.shortDescription) {
            queryParams["shortDescription"] = { $regex : new RegExp(query.shortDescription, "i") };
        }

        if(query.longDescription) {
            queryParams["longDescription"] = { $regex : new RegExp(query.longDescription, "i") };
        }

        if(query.status) {
            queryParams["status"] = { $regex : new RegExp(query.status, "i") };
        }

        if(query.authors) {
            queryParams["authors"] = { $regex : new RegExp(query.authors, "i") };
        }

        if(query.author) {
            queryParams["authors"] = { $regex : new RegExp(query.author, "i") };
        }

        if(query.categories) {
            queryParams["categories"] = { $regex : new RegExp(query.categories, "i") };
        }

        if(query.category) {
            queryParams["categories"] = { $regex : new RegExp(query.category, "i") };
        }

        return queryParams;
    }

    public async getBooks(query) {
        const filters = this.getFindFilters(query);

        let books = await this.bookModel.find(filters, bookProjection).exec();
        if(!books || !books[0]) {
            let booksWithoutFilters = await this.bookModel.find({}).exec();
            if(!booksWithoutFilters || !booksWithoutFilters[0]) {
                await this.postBooks();
                books = await this.bookModel.find(filters, bookProjection).exec();
            } else {
                throw new HttpException('Books not found', 404);
            }
        }

        const booksCount = books.length;
        
        return {
            booksCount,
            books
        };
    }

    public async fetchBooksFromUrl(url: string) {
        const books = [];

        const response = await this.httpService
        .get(url)
        .toPromise()
        .catch((err) => {
            throw new HttpException(err.response.data, err.response.status);
        });

        for (const book of response.data) {
            books.push(book);
        }

        return books;
    }

    public async postBooks(url?: string) {

        const booksUrl = url ?? "https://run.mocky.io/v3/d7f02fdc-5591-4080-a163-95a08ce6895e";

        const books = await this.fetchBooksFromUrl(booksUrl);

        return this.bookModel.insertMany(books).catch(function(error) {
            throw new HttpException(error, 500);
        })
    }
}
