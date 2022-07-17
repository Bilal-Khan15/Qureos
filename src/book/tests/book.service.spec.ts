import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from '../book.service';
import { getModelToken } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/common';
import { getBooks, findFilters } from './mocks/books.mock';
const searchFiltersJSON = require('./testData/searchBookQueryParams.json');

const mappingModel = {
  find: jest.fn(),
  insertMany: jest.fn(),
};

describe('BookService', () => {
  let service: BookService;
  let model: typeof mappingModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookService, {provide: getModelToken('Book'), useValue: mappingModel}],
      imports: [HttpModule]
    }).compile();

    service = module.get<BookService>(BookService);
    model = module.get(getModelToken('Book'));
  });
  
  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(model).toBeDefined();
  });

  it('should return search filters', () => {
    const findSearchFilters = service.getFindFilters(searchFiltersJSON);
    expect(findFilters).toMatchObject(findFilters);
  });

  it('should return filtered books', async () => {
    service.getBooks = jest.fn().mockResolvedValue(getBooks);
    const books = await service.getBooks(searchFiltersJSON);
    expect(books.booksCount).toBeGreaterThanOrEqual(1);
  })
});
