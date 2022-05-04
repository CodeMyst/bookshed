import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { addBookSellInfo, Book, deleteBook, getBook, getBookSellInfos, SellInfo } from 'src/app/api/book';
import { GlobalConstants } from 'src/app/api/global.constants';
import { createReview, deleteReview, editReview, getBookReviews, Review, ReviewResult } from 'src/app/api/review';
import { Role } from 'src/app/api/user';
import { DatePipe } from '@angular/common';
import { getSelf, isLoggedIn } from 'src/app/api/auth';


@Component({
    selector: 'app-book-info',
    templateUrl: './book-info.component.html',
    styleUrls: ['./book-info.component.scss']
})
export class BookInfoComponent implements OnInit {
    book: Book | undefined;
    reviews: Review[] = [];
    usersReview: Review | undefined;

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
    reviewRes: ReviewResult | null = null;

    constructor(private route: ActivatedRoute, private router: Router) { }

    async ngOnInit() {
        let strId: string = <string>this.route.snapshot.paramMap.get("id");
        this.book = await getBook(+strId);
        GlobalConstants.viewedBook = this.book;

        if (this.book.imageUrl !== "") {
            this.imageUrl = this.book.imageUrl;
        }

        this.isLoggedIn = await isLoggedIn();
        this.isAdmin = (await getSelf()).role === Role.ADMIN;

        this.sellInfos = await getBookSellInfos(this.book?.id);

        this.loadReviews();
    }

    async confirmDeleteBook() {
        if (confirm(`Are you sure you want to delete this book: ${this.book?.title}`)) {
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
        this.reviewRes = null;
    }

    toggleSellInfoSubmit() {
        this.isSubmittingSellInfo = !this.isSubmittingSellInfo;
    }

    async submitSellInfo() {
        await addBookSellInfo(this.book!.id, this.location, this.price);

        this.isSubmittingSellInfo = false;

        this.sellInfos = await getBookSellInfos(this.book!.id);
    }

    async submitOrEditReview(isPost: boolean) {
        this.reviewRes = isPost ?
            await createReview(this.book!.id, this.reviewContent) :
            await editReview(this.book!.id, this.usersReview!.id, this.reviewContent);

        this.loadReviews()
    }

    async loadReviews() {
        this.reviews = await getBookReviews(this.book!.id);
        this.usersReview = this.reviews.find(async r => r.author.username == (await getSelf()).username);

        if (this.usersReview) {
            this.reviewContent = this.usersReview!.content;
        }
    }

    formatDate(date: Date): string {
        const datepipe: DatePipe = new DatePipe('en-US');
        let formatedDate: string | null = datepipe.transform(date, 'dd/MM/YYYY');
        return formatedDate != null ? formatedDate : "unknown";
    }
}
