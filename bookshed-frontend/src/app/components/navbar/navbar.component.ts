import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { getSelf, isLoggedIn, logout } from 'src/app/api/auth';
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

  goToPage = GlobalConstants.goToPage;

  constructor(private router: Router) {
    this.onLogout = async () => {
      await logout();

      GlobalConstants.isLoggedIn = false;
      window.location.href = "/";
    };

    GlobalConstants.checkIfLogged = async () => {
      if (await isLoggedIn()) {
        GlobalConstants.currentUser = await getSelf();
        this.currentUser = GlobalConstants.currentUser;
        this.userRole = GlobalConstants.currentUser?.role === Role.USER ? "[U]" : "[A]";
      }
    }

    GlobalConstants.goToPage = (pageName: string) => {
      this.router.navigate([`${pageName}`]);
    }
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      GlobalConstants.checkIfLogged();
    });
  }

}
