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
    id: number = -1;
    apiBaseUrl: string  = "epil";

    constructor(private route: ActivatedRoute) {
    }

    
    async ngOnInit() {
        let strId: string = <string>this.route.snapshot.paramMap.get('id');
        this.id = +strId
        this.book = await getBook(this.id);
    }

}
