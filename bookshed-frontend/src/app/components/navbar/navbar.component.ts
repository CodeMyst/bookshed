import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getSelf, logout } from 'src/app/api/auth';
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

      window.location.href = "/";
    };

    GlobalConstants.goToPage = (pageName: string) => {
      this.router.navigate([`${pageName}`]);
    }
  }

  async ngOnInit() {
    this.currentUser = await getSelf();
    this.userRole = this.currentUser.role === Role.USER ? "[U]" : "[A]";
  }
}
