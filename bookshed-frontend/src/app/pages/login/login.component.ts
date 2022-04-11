import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResult, getUser, login } from 'src/app/api/auth';
import { GlobalConstants } from 'src/app/api/global.constants';
import { User } from 'src/app/api/user';

@Component({
  selector: 'app-register',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  res: AuthResult | null = null;

  username: string = "";
  password: string = "";

  onSubmit: any;
  reRoute: any;

  constructor(private router: Router) { 
    this.onSubmit = async () => {
      this.res = await login(this.username, this.password);

      GlobalConstants.currentUser = await getUser();
    };
    
    this.reRoute = () => {
      this.router.navigate(["/"]);
    };
  }

  async ngOnInit() {
  }

}
