import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { addBookSellInfo, Book, deleteBook, getBook, getBookSellInfos, SellInfo } from 'src/app/api/book';
import { GlobalConstants } from 'src/app/api/global.constants';
import { createReview, deleteReview, getBookReviews, Review, ReviewCreateResult } from 'src/app/api/review';
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

    imageUrl: string = "assets/no-image.jpg";

    isAdmin: boolean = false;
    isLoggedIn: boolean = false;

    onSubmit: any;

    sellInfos: SellInfo[] = [];

    isSubmittingSellInfo: boolean = false;
    location: string = "";
    price: number = 1.00;

    reviewContent: string = "";
    reviewRes: ReviewCreateResult | null = null;

    constructor(private route: ActivatedRoute, private router: Router) {}

    async ngOnInit() {
        let strId: string = <string>this.route.snapshot.paramMap.get("id");
        this.book = await getBook(+strId);
        GlobalConstants.viewedBook = this.book;

        if (this.book.imageUrl !== "") {
            this.imageUrl = this.book.imageUrl;
        }

        this.isAdmin =  GlobalConstants.currentUser?.role === Role.ADMIN;
        this.isLoggedIn = GlobalConstants.currentUser !== null;

        this.sellInfos = await getBookSellInfos(this.book?.id);

        this.loadReviews();
    }

    navigateToEdit() {
        this.router.navigate(["/editBook"]);
    }

    async confirmDeleteBook() {
        if (confirm("Are you sure you want to delete this book: '" + this.book?.title + "'") == true) {
            await deleteBook(this.book!.id);
            this.router.navigate(["/"]);
        }
    }

    async confirmDeleteReview(review: Review) {
        if (confirm(`Are you sure you want to delete ${review.author.username}'s review: ${review.content}`)) {
            await deleteReview(review.id)
            this.router.navigate([`/book/${review.book.id}`]);
        }
        this.loadReviews();
    }

    toggleSellInfoSubmit() {
        this.isSubmittingSellInfo = !this.isSubmittingSellInfo;
    }

    async submitSellInfo() {
        await addBookSellInfo(this.book!.id, this.location, this.price);

        this.isSubmittingSellInfo = false;

        this.sellInfos = await getBookSellInfos(this.book!.id);
    }

    async submitReview() {
        this.reviewRes = await createReview(this.book!.id, this.reviewContent);
        this.loadReviews();
        this.reviewContent = "";
    }

    async loadReviews() {
        this.reviews = await getBookReviews(this.book!.id);
    }

    formatDate(date: Date): string {
        const datepipe: DatePipe = new DatePipe('en-US');
        let formatedDate: string | null =  datepipe.transform(date, 'dd/MM/YYYY');
        return formatedDate != null ? formatedDate : "unknown";
    }
}
