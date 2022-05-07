import { Component, OnInit } from '@angular/core';
import { isLoggedIn } from 'src/app/api/auth';
import { BookCategory, BookCreateResult, editBook, getAllBookCategories } from 'src/app/api/book';
import { GlobalConstants } from 'src/app/api/global.constants';
import { ImageUploadResult, uploadImage } from 'src/app/api/image';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  isLoggedIn: boolean = false;

  goToPage = GlobalConstants.goToPage;

  categoryId: number;
  categories: BookCategory[];

  author: string = "";
  title: string = "";
  description: string = "";
  
  imageUrl: string = "";
  image: File | any;
  imgRes: ImageUploadResult | null = null;

  res: BookCreateResult | null = null;
  error: boolean = false;

  hasChanged: boolean = false;
  onFileChange: any;
  onSubmit: any;

  constructor() {
    this.categories = new Array;
    this.categoryId = GlobalConstants.viewedBook.category.id;

    this.onFileChange = (event: any) => {
      this.image = event.target.files[0];
      this.hasChanged = true;
    }
    
    this.onSubmit = async () => {
      this.error = false;

      if (!this.hasChanged) {
        this.imageUrl = GlobalConstants.viewedBook.imageUrl;
      } else {
        this.imgRes = await uploadImage(this.image);
        this.imageUrl = environment.apiBaseUrl + "/static/images/" + this.imgRes.filename;
      }

      if (this.title !== "" && this.author !== "" && this.description !== "") {
        this.res = await editBook(this.title, this.author, this.categoryId, this.description, this.imageUrl, GlobalConstants.viewedBook.id);
      } else {
        this.error = true;
      }
    }
  }

  async ngOnInit() {
    this.author = GlobalConstants.viewedBook.author;
    this.title = GlobalConstants.viewedBook.title;
    this.description = GlobalConstants.viewedBook.description;
    this.imageUrl = GlobalConstants.viewedBook.imageUrl;

    this.categories = await getAllBookCategories();

    this.isLoggedIn = await isLoggedIn();

    if (!this.isLoggedIn) this.goToPage("/forbidden");
  }

}
