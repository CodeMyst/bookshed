import { Component, OnInit } from '@angular/core';
import { Book, BookRating, getAllBooks, getAverageRating } from 'src/app/api/book';
import { GlobalConstants } from 'src/app/api/global.constants';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

    books: Book[];
    bookRatings: BookRating[];
    descriptionLengthLimit: number = 250;

    getAvgRating : any;
    isRating: boolean = false;

    apiBaseUrl: string = environment.apiBaseUrl;

    constructor() {
        this.books = new Array;
        this.bookRatings = new Array;

        GlobalConstants.onSearch = async () => {
            this.isRating = GlobalConstants.isBookRating;

            if (!this.isRating) {
                this.books = GlobalConstants.books;
            } else {
                this.bookRatings = GlobalConstants.bookRatings;
            }
        }

        this.getAvgRating = async (id: number) : Promise<number> => {
            return await getAverageRating(id);
        }
    }

    async ngOnInit() {
        this.books = await getAllBooks();
        this.apiBaseUrl = environment.apiBaseUrl;
        GlobalConstants.books = this.books;
    }

    truncateString(str: string, len: number): string {
        if (str.length > len) {
            return str.slice(0, len) + "...";
        } else {
            return str;
        }
    }
}
