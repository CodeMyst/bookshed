import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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

  constructor(private router: Router) {
    this.onLogout = async () => {
      await logout();

      GlobalConstants.currentUser = null;

      GlobalConstants.checkIfLogged();
    };

    GlobalConstants.checkIfLogged = () => {
      this.currentUser = GlobalConstants.currentUser;
      this.userRole = this.currentUser?.role === Role.USER ? "[U]" : "[A]";
    }
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
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
