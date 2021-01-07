import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarItemsService } from '../Services/navbar-items.service';
import { SignUpService } from '../Services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  private signUpService: SignUpService;
  private router: Router;
  public navItems: NavbarItemsService;

  public fullname: string;
  public email: string;
  public username: string;
  public password: string;
  public confirmPassword: string;
  public agreeTOC: boolean;

  constructor(signUpService: SignUpService, router: Router, navItems: NavbarItemsService) {
    this.signUpService = signUpService;
    this.router = router;
    this.navItems = navItems;

    this.fullname = "";
    this.email = "";
    this.username = "";
    this.password = "";
    this.confirmPassword = "";
    this.agreeTOC = false;
  }

  ngOnInit() {
    this.navItems.hide();
  }

  public checkSpaces(str: string): boolean {
    let len: number = str.length;
    for (let i: number = 0; i < len; i++) {
      if (str[i] != ' ')
        return true;
    }
    return false;
  }
  public checkEmail(str: string): boolean {
    let len: number = str.length;
    if (len < 7)
      return false;
    let at: boolean = false, dot: boolean = false;
    for (let i: number = 0; i < len; i++) {
      if (str[i] == '@')
        at = true;
      if (at && str[i] == '.')
        dot = true;
    }
    return (at && dot);
  }
  public verifySignUp(args) {
    if (this.fullname == "" || !this.checkSpaces(this.fullname)) {
      alert("Your Full Name cannot be empty");
    }
    else if (this.email == "" || !this.checkSpaces(this.email)) {
      alert("Your Email cannot be empty");
    }
    else if (!this.checkEmail(this.email)) {
      alert("Please enter a valid Email");
    }
    else if (this.username == "" || this.username.length < 5) {
      alert("Username's minimum length should be 5 characters");
    }
    else if (this.password == "" || this.password.length < 5) {
      alert("Password's minimum length should be 5 characters");
    }
    else if (this.password != this.confirmPassword) {
      alert("Both passwords should match");
    }
    else if (!this.agreeTOC) {
      alert("You must accept Terms and Conditions to Continue.");
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }

  public checkValidName(args) {
    var isValidName: boolean = false;
    var charCode = args.key;
    if (charCode >= 'a' && charCode <= 'z')
      isValidName = true;
    else if (charCode >= 'A' && charCode <= 'Z')
      isValidName = true;
    else if (charCode == ' ')
      isValidName = true;
    else
      isValidName = false;
    return isValidName;
  }
  public checkValidEmail(args) {
    var isValidEmail: boolean = false;
    var charCode = args.key;
    if (charCode >= 'a' && charCode <= 'z')
      isValidEmail = true;
    else if (charCode >= 'A' && charCode <= 'Z')
      isValidEmail = true;
    else if (charCode == '@' || charCode == '.' || charCode == '_')
      isValidEmail = true;
    else if (charCode >= '0' && charCode <= '9')
      isValidEmail = true;
    else
      isValidEmail = false;
    return isValidEmail;
  }
  public checkValidUsername(args) {
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
