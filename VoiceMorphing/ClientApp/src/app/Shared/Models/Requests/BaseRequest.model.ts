export class BaseRequestModel {
  LoggedInUserId: string;
  UserLanguage: string;
  CustomerNumber: number;

  constructor() {
    this.LoggedInUserId = undefined;
    this.UserLanguage = 'en';
    this.CustomerNumber = -1;
  }
}
