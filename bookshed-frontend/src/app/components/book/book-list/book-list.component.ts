import { Component, OnInit } from '@angular/core';
import { Book, getAllBooks } from 'src/app/api/book';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

    books: Book[];
    apiBaseUrl: string = environment.apiBaseUrl;

    constructor() {
        this.books = new Array;
    }

    async ngOnInit() {
        this.books = await getAllBooks();
        this.apiBaseUrl = environment.apiBaseUrl;
    }

}
