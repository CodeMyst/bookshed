import { Component, OnInit } from '@angular/core';
import { BookCategory, BookCreateResult, createBook, getAllBookCategories } from 'src/app/api/book';
import { ImageUploadResult, uploadImage } from 'src/app/api/image';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  categoryId: number;
  categories: BookCategory[];

  author: string = "";
  title: string = "";
  description: string = "";
  imageUrl: string = "";

  image: File | any;

  res: BookCreateResult | null = null;
  imgRes: ImageUploadResult | null = null;
  onSubmit: any;

  constructor() {
    this.categories = new Array;
    this.categoryId = 1;

    this.onSubmit = async () => {
      this.imgRes = await uploadImage(this.image);
      this.imageUrl =  environment.apiBaseUrl + "/static/images/" + this.imgRes.filename;
      console.log(this.image);
      console.log(this.imageUrl);
      console.log(this.imgRes);

      this.res = await createBook(this.title, this.author, this.categoryId, this.description, this.imageUrl);
    }
  }

  async ngOnInit() {
    this.categories = await getAllBookCategories();
  }

  onFileChanged(event: any) {
    this.image = event.target.files[0];
  }

}