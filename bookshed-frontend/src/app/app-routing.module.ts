import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { BookInfoComponent } from './pages/book/book-info/book-info.component';
import { CreateBookComponent } from './pages/book/create-book/create-book.component';
import { EditBookComponent } from './pages/book/edit-book/edit-book.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "createBook",
    component: CreateBookComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "logout",
    component: HomeComponent
  },
  {
    path: "book",
    children: [
      {
        path: ":id",
        component: BookInfoComponent
      }
    ]
  },
  {
    path: "editBook",
    component: EditBookComponent
  },
  {
    path: "forbidden",
    component: ForbiddenComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
