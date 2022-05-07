import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { addBookSellInfo, Book, deleteBook, getBook, getBookSellInfos, SellInfo } from 'src/app/api/book';
import { GlobalConstants } from 'src/app/api/global.constants';
import { createReview, deleteReview, editReview, getBookReviews, Review, ReviewResult } from 'src/app/api/review';
import { Role, User } from 'src/app/api/user';
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

    apiBaseUrl: string = "";

    imageUrl: string = "assets/no-image.jpg";

    isAdmin: boolean = false;
    isLoggedIn: boolean = false;

    loggedUser: User | undefined;

    onSubmit: any;

    sellInfos: SellInfo[] = [];

    isSubmittingSellInfo: boolean = false;
    location: string = "";
    price: number = 1.00;

    reviewContent: string = "";
    reviewEditContent: string = "";
    visibleEditFormReviewId: number | undefined;

    reviewRes: ReviewResult | null = null;

    constructor(private route: ActivatedRoute, private router: Router, private renderer: Renderer2) { }

    async ngOnInit() {
        let strId: string = <string>this.route.snapshot.paramMap.get("id");
        this.book = await getBook(+strId);
        GlobalConstants.viewedBook = this.book;

        if (this.book.imageUrl !== "") {
            this.imageUrl = this.book.imageUrl;
        }

        this.isLoggedIn = await isLoggedIn();
        this.isAdmin = (await getSelf()).role === Role.ADMIN;
        this.loggedUser = await getSelf();

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

    isLoggedUserReviewAuthor(review: Review) {
        return review.author.username == this.loggedUser?.username;
    }

    async submitReview() {
        await createReview(this.book!.id, this.reviewContent);

        this.loadReviews()
    }

    async editReview(reviewId: number) {
        await editReview(this.book!.id, reviewId, this.reviewEditContent);
        this.loadReviews()
    }
    
    toggleEditReviewForm(review: Review) {
        // close the already opened some edit form, close it
        if (this.visibleEditFormReviewId) {
            this.renderer.setStyle(
                document.getElementById(`review-edit-form-${this.visibleEditFormReviewId}`),
                'display', 'none'
            );

            this.renderer.setStyle(
                document.getElementById(`review-content-${this.visibleEditFormReviewId}`),
                'display', 'block'
            );

            this.reviewEditContent = '';
        }

        if (this.visibleEditFormReviewId == review.id) {
            // if just closed form was the one selected
            this.visibleEditFormReviewId = undefined;
        } else {
            // some other one is closed, show selected
            this.renderer.setStyle(
                document.getElementById(`review-edit-form-${review.id}`),
                'display', 'block'
            );

            this.renderer.setStyle(
                document.getElementById(`review-content-${review.id}`),
                'display', 'none'
            );

            this.visibleEditFormReviewId = review.id;
            this.reviewEditContent = review.content;
        }
    }

    async loadReviews() {
        this.reviews = await getBookReviews(this.book!.id);
    }

    formatDate(date: Date): string {
        const datepipe: DatePipe = new DatePipe('en-US');
        let formatedDate: string | null = datepipe.transform(date, 'dd/MM/YYYY');
        return formatedDate != null ? formatedDate : "unknown";
    }
}
