import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book, BookCategory, BookCreateResult, editBook, getAllBookCategories } from 'src/app/api/book';
import { GlobalConstants } from 'src/app/api/global.constants';
import { ImageUploadResult, uploadImage } from 'src/app/api/image';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  categoryId: number;
  categories: BookCategory[];

  author: string = "";
  title: string = "";
  description: string = "";
  imageUrl: string = "";

  image: File | any;
  hasChanged: boolean = false;

  onFileChanged(event: any) {
    this.image = event.target.files[0];
    this.hasChanged = true;
  }

  res: BookCreateResult | null = null;
  imgRes: ImageUploadResult | null = null;
  onSubmit: any;

  constructor(private route: ActivatedRoute) {
    this.categories = new Array;
    this.categoryId = GlobalConstants.viewedBook.category.id;

    this.onSubmit = async () => {
      if (!this.hasChanged) {
        this.imageUrl = GlobalConstants.viewedBook.imageUrl;
      } else {
        this.imgRes = await uploadImage(this.image);
        this.imageUrl = environment.apiBaseUrl + "/static/images/" + this.imgRes.filename;
      }

      this.res = await editBook(this.title, this.author, this.categoryId, this.description, this.imageUrl, GlobalConstants.viewedBook.id);
    }
  }

  async ngOnInit() {
    this.author = GlobalConstants.viewedBook.author;
    this.title = GlobalConstants.viewedBook.title;
    this.description = GlobalConstants.viewedBook.description;
    this.imageUrl = GlobalConstants.viewedBook.imageUrl;

    this.categories = await getAllBookCategories();
  }

}
