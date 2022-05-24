import { Component, OnInit } from '@angular/core';
import { Book, BookCategory, BookRating, getAllBookCategories, getAllBooks, getBestInLastMonth, getByCategory, searchBooks } from 'src/app/api/book';
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
  sortedCategories: BookCategory[];

  res: Book[] | null = null;
  ratingRes: BookRating[] | null = null;
  message: string = "all";
  message2: string = "";
  noResult: boolean = false;

  onSubmit: any;
  onViewBest: any;

  constructor() { 
    this.categories = new Array;
    this.sortedCategories = new Array;
    this.categoryId = 0;
  
    this.onSubmit = async () => {
      this.noResult = false;

      if (this.search !== "") {
        this.res = await searchBooks(this.search, this.categoryId);
        this.message = "search";
      } else if (this.search === "" && this.categoryId != 0) {
        this.res = await getByCategory(this.categoryId);
        for (let i = 0; i < this.sortedCategories.length; i++) {
          if (this.sortedCategories[i].id === this.categoryId)
            this.message = this.sortedCategories[i].name;
        }
      } else {
        this.res = await getAllBooks();
        this.message = "all";
      }

      if (this.res.length == 0) {
        this.noResult = true;
      }

      GlobalConstants.books = this.res;
      GlobalConstants.isBookRating = false;
      GlobalConstants.onSearch();
    }

    this.onViewBest = async () => {
      this.message = "top rated";
      this.message2 = " of this month";

      this.ratingRes = await getBestInLastMonth();

      if (this.ratingRes.length == 0) {
        this.noResult = true;
      }

      GlobalConstants.bookRatings = this.ratingRes;
      GlobalConstants.isBookRating = true;
      GlobalConstants.onSearch();
    }
  }

  async ngOnInit() {
    this.categories = await getAllBookCategories();

    this.sortedCategories = this.categories.sort((a, b) => a.name.localeCompare(b.name));
  }

}
