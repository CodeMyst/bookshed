import { Component, OnInit } from '@angular/core';
import { User } from './api/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bookshed';
  // public users: User[] = [];

  // constructor(private authService: AuthService) {}

  // ngOnInit(): void {
  //   this.register();
  // }

  // public register(): void {
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  // }

  public onOpenModal(user: User, mode: string): void {
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");

    if (mode === "register") {
      button.setAttribute("data-target", "#idhtmla");
    } else if (mode === "login") {
      button.setAttribute("data-target", "#");
    } else if (mode === "logout") {
      button.setAttribute("data-target", "#");
    }
  }
}

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   title = 'bookshed-frontend';
// }