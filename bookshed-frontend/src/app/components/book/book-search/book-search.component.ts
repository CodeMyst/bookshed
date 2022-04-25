import { Component, OnInit } from '@angular/core';
import { Book, BookCategory, getAllBookCategories, getByCategory, searchBooks } from 'src/app/api/book';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  search: string = "";
  categoryId: number;
  categories: BookCategory[];

  res: Book[] | null = null;

  onSubmit: any;

  constructor() { 
    this.categories = new Array;
    this.categoryId = 0;
  
    this.onSubmit = async () => {
      if (this.search === "" && this.categoryId !== 0) {
        this.res = await getByCategory(this.categoryId);
      } else {
        this.res = await searchBooks(this.search, this.categoryId);
      }
      console.log(this.res);
    }
  }

  async ngOnInit() {
    this.categories = await getAllBookCategories();
  }

}
