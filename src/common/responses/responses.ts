import { HttpException } from '@nestjs/common';

export function ResponseOK(message: string, code = 201) {
  return {
    success: true,
    message: message,
    code: code,
  };
}

export function ResponseGet<T>(data: T, code = 200, success = true) {
  return {
    success: success,
    data: data,
    code: code,
  };
}

export function ResponseError(error: any, code = 404) {
  const jsonError = {
    success: false,
    error: error,
    code: code,
  };
  throw new HttpException(jsonError, code);
}
