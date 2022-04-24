import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book, deleteBook, getBook } from 'src/app/api/book';
import { GlobalConstants } from 'src/app/api/global.constants';
import { createReview, getBookReviews, Review, ReviewCreateResault } from 'src/app/api/review';
import { Role } from 'src/app/api/user';
import { DatePipe } from '@angular/common';


@Component({
    selector: 'app-book-info',
    templateUrl: './book-info.component.html',
    styleUrls: ['./book-info.component.scss']
})
export class BookInfoComponent implements OnInit {

    book: Book | undefined;
    reviews: Review[] = [];

    apiBaseUrl: string = "";
    descriotionLengthLimit: number = 100;
    imageUrl: string = "assets/no-image.jpg";

    isAdmin: boolean = false;
    isLoggedIn: boolean = false;

    onSubmit: any;

    content: string = "";
    res: ReviewCreateResault | null = null;

    constructor(private route: ActivatedRoute, private router: Router) {
        this.onSubmit = async () => {
            this.res = await createReview(this.book!.id, this.content);
            this.loadReviews();
        }
    }

    async ngOnInit() {
        let strId: string = <string>this.route.snapshot.paramMap.get("id");
        this.book = await getBook(+strId);
        GlobalConstants.viewedBook = this.book;

        if (this.book.imageUrl !== "") {
            this.imageUrl = this.book.imageUrl;
        }

        this.isAdmin =  GlobalConstants.currentUser?.role === Role.ADMIN;
        this.isLoggedIn = GlobalConstants.currentUser !== null;

        this.loadReviews();
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

    async loadReviews() {
        this.reviews = await getBookReviews(this.book!.id);
    }

    formatDate(date: Date): string {
        const datepipe: DatePipe = new DatePipe('en-US');
        let formatedDate: string | null =  datepipe.transform(date, 'dd/MM/YYYY');
        console.log("EOPI:" + formatedDate);
        return formatedDate != null ? formatedDate : "unknown";
    }
    
}