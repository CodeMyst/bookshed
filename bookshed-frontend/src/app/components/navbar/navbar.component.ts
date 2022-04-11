import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { logout } from 'src/app/api/auth';
import { GlobalConstants } from 'src/app/api/global.constants';
import { User, Role } from 'src/app/api/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentUser: User | null = null;
  userRole: string = "";

  onLogout: any;
  onLogin: any;
  checkIfLogged: any;

  constructor(private router: Router) {
    this.onLogout = async () => {
      await logout();

      GlobalConstants.currentUser = null;
    };

    this.checkIfLogged = () => {
      this.currentUser = GlobalConstants.currentUser;
      this.userRole = this.currentUser?.role === Role.USER ? "[U]" : "[A]";
    }
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit() {
  }

}
