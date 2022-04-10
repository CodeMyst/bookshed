import { Component, OnInit } from '@angular/core';
import { getUser } from 'src/app/api/auth';
import { BookCategory, BookCreateResult, createBook, getAllBookCategories } from 'src/app/api/book';
import { User } from 'src/app/api/user';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  public categoryId: number;
  public categories: BookCategory[];
  public res: BookCreateResult | null = null
  public onSubmit: any;

  constructor() {
    let author: string = "test";
    let title: string;
    let description: string;
    let imageUrl: string = "000";
    this.categories = new Array;

    this.categoryId = 0;

    this.onSubmit = async () => {
      // this.res = await createBook(title, author, this.categoryId, description, imageUrl);
      console.log(this.categoryId);
    }

    // let currentUser: User;

    // currentUser = getUser();
  }

  async ngOnInit() {
    this.categories = await getAllBookCategories();
  }

}
