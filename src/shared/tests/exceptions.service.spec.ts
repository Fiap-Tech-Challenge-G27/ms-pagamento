import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ExceptionsService } from '../infra/exceptions/exceptions.service';
import { IExceptionBody } from '../exceptions/exceptions.interface';

describe('ExceptionsService', () => {
  let service: ExceptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExceptionsService],
    }).compile();

    service = module.get<ExceptionsService>(ExceptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw a ForbiddenException', () => {
    const data: IExceptionBody = { message: 'Forbidden' };
    expect(() => service.forbiddenException(data)).toThrow(ForbiddenException);
  });

  it('should throw a NotFoundException', () => {
    const data: IExceptionBody = { message: 'Not Found' };
    expect(() => service.notFoundException(data)).toThrow(NotFoundException);
  });

  it('should throw an InternalServerErrorException', () => {
    const data: IExceptionBody = { message: 'Internal Server Error' };
    expect(() => service.internalServerErrorException(data)).toThrow(InternalServerErrorException);
  });

  it('should throw a BadRequestException', () => {
    const data: IExceptionBody = { message: 'Bad Request' };
    expect(() => service.badRequestException(data)).toThrow(BadRequestException);
  });
});
