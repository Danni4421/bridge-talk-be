import { Injectable } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ValidationService {
  validate<T>(zodType: ZodType<T>, data: T): Full<T> {
    const zodTypeFull = zodType.transform(full);
    return zodTypeFull.parse(data);
  }
}

function full<T>(x: T) {
  return x as Full<T>;
}

type Full<T> = { [K in keyof T]-?: [T[K]] } extends infer U
  ? U extends Record<keyof U, [any]>
    ? { [K in keyof U]: U[K][0] }
    : never
  : never;
