import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators';
import { RestfulService } from '../Shared/Services/restful.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private restfulService: RestfulService;
  constructor(restfulService: RestfulService) {
    this.restfulService = restfulService;
  }
  public VerifyLogin(username: string, password: string): any {
    console.log("Login Service VerifyLogin() Called");
    return this.restfulService.GetRequest(`Login/LoginVerification?username=${username}&password=${password}`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
