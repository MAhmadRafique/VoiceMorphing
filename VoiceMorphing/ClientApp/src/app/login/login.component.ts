import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { NavbarItemsService } from '../Services/navbar-items.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginService: LoginService;
  private router: Router;
  public navItems: NavbarItemsService;

  public username: string;
  public password: string;
  constructor(loginService: LoginService, router: Router, navItems: NavbarItemsService) {
    this.loginService = loginService;
    this.router = router;
    this.navItems = navItems;

    this.username = "";
    this.password = "";
  }

  ngOnInit() {
    this.navItems.hide();
  }

  verifyLogin(args) {
    if (this.username == "" || this.username.length < 5) {
      alert("Username's minimum length should be 5 characters");
    }
    else if (this.password == "" || this.password.length < 5) {
      alert("Password's minimum length should be 5 characters");
    }
    else {
      this.loginService.VerifyLogin(this.username.toLowerCase(), this.password).subscribe((data) => {
        switch (data) {
          case -2:
            alert("Either username or Password is NULL");
            break;
          case -1:
            alert("Incorrect Username");
            break;
          case 0:
            this.router.navigateByUrl('/home');
            break;
          case 1:
            alert("Incorrect Password");
            break;
          default:
            break;
        }
      });
    }
  }

  checkValidUsername(args) {
    var isValidUsername: boolean = false;
    var charCode = args.key;
    if (charCode >= 'a' && charCode <= 'z')
      isValidUsername = true;
    else if (charCode >= 'A' && charCode <= 'Z')
      isValidUsername = true;
    else if (charCode == '.' || charCode == '_')
      isValidUsername = true;
    else if ((charCode >= '0' && charCode <= '9'))
      isValidUsername = true;
    else
      isValidUsername = false;
    return isValidUsername;
  }
}
