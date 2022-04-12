import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book, deleteBook, getBook } from 'src/app/api/book';
import { GlobalConstants } from 'src/app/api/global.constants';

@Component({
    selector: 'app-book-info',
    templateUrl: './book-info.component.html',
    styleUrls: ['./book-info.component.scss']
})
export class BookInfoComponent implements OnInit {

    book: Book | undefined;
    apiBaseUrl: string = "";
    descriotionLengthLimit: number = 100;
    isAdmin: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router) { }

    async ngOnInit() {
        let strId: string = <string>this.route.snapshot.paramMap.get("id");
        this.book = await getBook(+strId);
        GlobalConstants.viewedBook = this.book;

        this.isAdmin =  GlobalConstants.currentUser?.role === "ADMIN";
    }

    navigateToEdit() {
        this.router.navigate(["/editBook"]);
    }

    confirmDelete() {
        if (confirm("Are you sure you want to delete this book: '" + this.book?.title + "'") == true) {
            deleteBook(this.book!.id);
            this.router.navigate(["/"]);
        }
    }
}
