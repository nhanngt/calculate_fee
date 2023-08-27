import { IError } from './error.interface';

export interface IUsecaseOutput<T> {
  error?: IError;
  result?: T;
}
