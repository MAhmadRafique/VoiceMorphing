import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/internal/operators";
import { InterceptorHttpParams } from '../Routes/InterceptorHttpParams';
import { BaseRequestModel } from '../Models/Requests/BaseRequest.model';

@Injectable({
  providedIn: 'root',
})
export class RestfulService {

  private baseURL: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseURL = baseUrl + "api/";
  }

  /* Get Method implementation */
  public GetRequest(url: string, showLoader: boolean = true, responseType: any = 'json', parameters?: HttpParams) {
    const httpParams = new InterceptorHttpParams(showLoader);
    return this.http.get(this.baseURL + url, {
      observe: 'response',
      params: httpParams,
      responseType: responseType
    }).pipe(
      map(response => {
        return response.body;
      })
    );
  }

  /* Post Method implementation */
  public PostRequest(url: string, body: BaseRequestModel, showLoader: boolean = true, responseType: any = 'json', parameters?: HttpParams) {
    let httpParams = new InterceptorHttpParams(showLoader);
    if (parameters != undefined) {
      httpParams = <InterceptorHttpParams>parameters;
      httpParams.showLoader = showLoader;
    }
    return this.http.post(this.baseURL + url, JSON.stringify(body), {
      observe: 'response',
      params: httpParams,
      responseType: responseType
    }).pipe(
      map(response => {
        return response.body;
      })
    );
  }
}
