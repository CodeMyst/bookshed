import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book, getBook } from 'src/app/api/book';

@Component({
    selector: 'app-book-info',
    templateUrl: './book-info.component.html',
    styleUrls: ['./book-info.component.scss']
})
export class BookInfoComponent implements OnInit {

    book: Book | undefined;
    apiBaseUrl: string = "";
    descriotionLengthLimit: number = 100;

    constructor(private route: ActivatedRoute) { }

    async ngOnInit() {
        let strId: string = <string>this.route.snapshot.paramMap.get('id');
        this.book = await getBook(+strId);
    }
}
