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

  categoryId: number;
  categories: BookCategory[];

  author: string = "test";
  title: string = "";
  description: string = "";
  imageUrl: string = "000";

  res: BookCreateResult | null = null
  onSubmit: any;

  currentUser: User | null = null;

  constructor() {
    this.categories = new Array;
    this.categoryId = 1;

    this.onSubmit = async () => {
      // this.res = await createBook(title, author, this.categoryId, description, imageUrl);
    }
  }

  async ngOnInit() {
    this.categories = await getAllBookCategories();
    this.currentUser = await getUser();
  }

}
