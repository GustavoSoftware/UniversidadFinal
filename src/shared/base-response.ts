export class BaseResponse<T> {
  success: boolean;
  mensage: string;
  data: T | null;

  constructor(success: boolean, mensage: string, data: T | null) {
    this.success = success;
    this.mensage = mensage;
    this.data = data;
  }

  static success<U>(mensage: string, data: U): BaseResponse<U> {
    return new BaseResponse<U>(true, mensage, data);
  }

  static error(message: string): BaseResponse<null> {
    return new BaseResponse<null>(false, message, null);
  }
}
