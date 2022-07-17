import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from '../book.controller';
import { BookService } from '../book.service';
import { getModelToken } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/common';

describe('BookController', () => {
  let controller: BookController;

  const mappingModel = {
    find: jest.fn(),
    insertMany: jest.fn(),
  };
  
  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService, {provide: getModelToken('Book'), useValue: mappingModel}],
      imports: [HttpModule]
    }).compile();

    controller = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
