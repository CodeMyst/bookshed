import { Component, OnInit } from '@angular/core';
import { AuthResult, getUser, logout } from 'src/app/api/auth';
import { GlobalConstants } from 'src/app/api/global.constants';
import { User } from 'src/app/api/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentUser: any;

  onLogout: any;
  onLogin: any;
  checkIfLogged: any;

  constructor() {
    this.onLogout = async () => {
      await logout();

      GlobalConstants.currentUser = null;
    };


    this.checkIfLogged = () => {
      this.currentUser = GlobalConstants.currentUser;
    }
  }

  ngOnInit() {
    console.log("current user: " + this.currentUser);
  }

}
