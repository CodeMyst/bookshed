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
    id: string | null = null;
    apiBaseUrl: string  = "epil";

    constructor(private route: ActivatedRoute) {
    }

    
    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
    }

}
