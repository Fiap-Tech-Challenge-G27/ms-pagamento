import { IExceptionService, IExceptionBody } from 'src/shared/exceptions/exceptions.interface';
export declare class ExceptionsService implements IExceptionService {
    forbiddenException(data?: IExceptionBody): void;
    notFoundException(data?: IExceptionBody): void;
    internalServerErrorException(data?: IExceptionBody): void;
    badRequestException(expBody: IExceptionBody): void;
}
