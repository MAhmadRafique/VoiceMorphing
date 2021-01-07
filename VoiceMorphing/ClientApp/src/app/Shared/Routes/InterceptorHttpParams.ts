import { HttpParams } from '@angular/common/http';

export class InterceptorHttpParams extends HttpParams {
  constructor(public showLoader: boolean) {
    super();
  }
}
