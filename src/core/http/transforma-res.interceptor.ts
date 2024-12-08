import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NestResponse } from './nest-response';
import { isContext } from 'vm';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

@Injectable()
export class TransformaResInterceptor implements NestInterceptor {
  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((resControlator: NestResponse) => {
        if (resControlator instanceof NestResponse) {
          const contexto = context.switchToHttp();
          const res = contexto.getResponse();
          const { headers, status, body } = resControlator;

          const nomesDosCabecalhos = Object.getOwnPropertyNames(headers);

          nomesDosCabecalhos.forEach((nomesDoCabecalho) => {
            const valorCabecalho = headers[nomesDoCabecalho];
            this.httpAdapter.setHeader(res, nomesDoCabecalho, valorCabecalho);
          });

          this.httpAdapter.status(res, status);

          return body;
        }
        return resControlator;
      }),
    );
  }
}
