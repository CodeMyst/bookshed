import { Component, OnInit } from '@angular/core';
import { Book, BookCategory, getAllBookCategories, getAllBooks, getByCategory, searchBooks } from 'src/app/api/book';
import { GlobalConstants } from 'src/app/api/global.constants';

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
  message: string = "all";

  onSubmit: any;

  constructor() { 
    this.categories = new Array;
    this.categoryId = 0;
  
    this.onSubmit = async () => {
      if (this.search === "" && this.categoryId === 0) {
        this.res = await getAllBooks();
        this.message = "all";
      } else if (this.search === "" && this.categoryId !== 0) {
        this.res = await getByCategory(this.categoryId);
        this.message = this.categories[this.categoryId-1].name;
      } else {
        this.res = await searchBooks(this.search, this.categoryId);
        this.message = "search";
      }

      GlobalConstants.books = this.res;
      GlobalConstants.onSearch();
    }
  }

  async ngOnInit() {
    this.categories = await getAllBookCategories();
  }

}
