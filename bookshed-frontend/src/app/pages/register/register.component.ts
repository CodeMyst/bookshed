import { Component, OnInit } from '@angular/core';
import { AuthResult, register } from 'src/app/api/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  res: AuthResult | null = null;
  email: string = "";
  username: string = "";
  password: string = "";
  passwordConfirm: string = "";


  onSubmit: any;

  constructor() {
    this.onSubmit = async () => {
      if (this.password === this.passwordConfirm) {
        this.res = await register(this.username, this.email, this.password);
      }

      // resetting fields after registration
      if (this.res !== null && this.res.success) {
        this.email = "";
        this.username = "";
        this.password = "";
        this.passwordConfirm = "";
      }
    };
  }

  ngOnInit(): void {
  }

}
