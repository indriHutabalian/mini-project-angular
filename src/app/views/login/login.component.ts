import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  userLogin = { username: "", password: "" };
  errorMessage = "";
  isUsernameEmpty: boolean = false;
  isPasswordEmpty: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService) {
  }

  ngOnInit() {
    sessionStorage.clear();
  }

  login() {
    if (this.validate()) {
      this.userService.login(this.userLogin.username, this.userLogin.password).subscribe(
        data => {
          var response = <any>data;
          if (response.status == 200) {
            sessionStorage.setItem("User", JSON.stringify(response._body));
            this.router.navigate(['/home'])
          } else {
            this.errorMessage = response._body;
          }
        }
      )
    }
  }

  validate() {
    this.isUsernameEmpty = false;
    this.isPasswordEmpty = false;
    if (this.userLogin.username == "")
      this.isUsernameEmpty = true;
    if (this.userLogin.password == "")
      this.isPasswordEmpty = true;
    return !this.isPasswordEmpty && !this.isUsernameEmpty;
  }

  closeAlert() {
    this.errorMessage = "";
  }

  setClassError(isEror) {
    if (isEror)
      return 'is-invalid'
    else
      return ''
  }
}
