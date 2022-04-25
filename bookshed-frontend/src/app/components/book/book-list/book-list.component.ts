import { Component, OnInit } from '@angular/core';
import { Book, getAllBooks } from 'src/app/api/book';
import { GlobalConstants } from 'src/app/api/global.constants';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

    books: Book[];
    descriptionLengthLimit: number = 250;

    apiBaseUrl: string = environment.apiBaseUrl;

    constructor() {
        this.books = new Array;

        GlobalConstants.onSearch = async () => {
            this.books = GlobalConstants.books;
        }
    }

    async ngOnInit() {
        this.books = await getAllBooks();
        this.apiBaseUrl = environment.apiBaseUrl;
    }

    truncateString(str: string, len: number): string {
        if (str.length > len) {
            return str.slice(0, len) + "...";
        } else {
            return str;
        }
    }
}
