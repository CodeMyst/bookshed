import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResult, login } from 'src/app/api/auth';

@Component({
  selector: 'app-register',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // public form = {} as HTMLFormElement;

  res: AuthResult | null = null;

  username: string = "laz";
  password: string = "";

  onSubmit: any;
  reRoute: any;

  constructor(private router: Router) { 
    this.onSubmit = async () => {
      // this.res = await login(this.username, this.password);
      console.log(this.username)

      // if (this.res.success) this.form.reset();
    };

    this.reRoute = () => {
      this.router.navigate(["/"]);
    };
  }

  ngOnInit(): void {
  }

}
