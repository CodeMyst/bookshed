import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { CreateBookComponent } from './pages/book/create-book/create-book.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { BookListComponent } from './components/book/book-list/book-list.component';
import { EditBookComponent } from './pages/book/edit-book/edit-book.component';
import { BookInfoComponent } from './pages/book/book-info/book-info.component';
import { BookSearchComponent } from './components/book/book-search/book-search.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { ForumComponent } from './pages/forum/forum.component';
import { CreatePostComponent } from './components/forum/create-post/create-post.component';
import { PostInfoComponent } from './components/forum/post-info/post-info.component';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { EditPostComponent } from './components/forum/edit-post/edit-post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RatingModule } from 'ngx-bootstrap/rating';
import { InterestingFactComponent } from './components/interesting-fact/interesting-fact.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    CreateBookComponent,
    HomeComponent,
    BookListComponent,
    EditBookComponent,
    BookInfoComponent,
    BookSearchComponent,
    ForbiddenComponent,
    ForumComponent,
    CreatePostComponent,
    PostInfoComponent,
    MarkdownPipe,
    EditPostComponent,
    InterestingFactComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    RatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
