import { Component, OnInit } from '@angular/core';
import { isLoggedIn } from 'src/app/api/auth';
import { BookCategory, BookCreateResult, createBook, getAllBookCategories } from 'src/app/api/book';
import { GlobalConstants } from 'src/app/api/global.constants';
import { ImageUploadResult, uploadImage } from 'src/app/api/image';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  isLoggedIn: boolean = false;

  goToPage = GlobalConstants.goToPage;

  categoryId: number;
  categories: BookCategory[];

  imageUrl: string = "";
  image: File | any;
  imgRes: ImageUploadResult | null = null;

  res: BookCreateResult | null = null;
  error: boolean = false;

  onSubmit: any;
  onFileChanged: any;

  constructor() {
    this.categories = new Array;
    this.categoryId = 1;

    this.onSubmit = async (bookForm: any) => {
      this.error = false;

      this.imgRes = await uploadImage(this.image);
      this.imageUrl = environment.apiBaseUrl + "/static/images/" + this.imgRes.filename;

      if (bookForm.value.title && bookForm.value.author && bookForm.value.description) {
        this.res = await createBook(bookForm.value.title, bookForm.value.author, this.categoryId, bookForm.value.description, this.imageUrl);
      } else {
        this.error = true;
      }
    }

    this.onFileChanged = (event: any) => {
      this.image = event.target.files[0];
    }
  }

  async ngOnInit() {
    this.categories = await getAllBookCategories();

    this.isLoggedIn = await isLoggedIn();

    if (!this.isLoggedIn) {
      this.goToPage("/forbidden");
    }
  }
}
