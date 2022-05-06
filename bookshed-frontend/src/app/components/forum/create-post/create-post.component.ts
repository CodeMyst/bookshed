import { Component, OnInit } from '@angular/core';
import * as EasyMDE from 'easymde';
import { isLoggedIn } from 'src/app/api/auth';
import { GlobalConstants } from 'src/app/api/global.constants';
import { createPost, PostCreateResult } from 'src/app/api/post';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  isLoggedIn: boolean = false;

  goToPage = GlobalConstants.goToPage;

  author: string = "";
  title: string = "";
  content: string = "";
  imageUrl: string = "";
  sticky: boolean = false;


  res: PostCreateResult | null = null;

  onSubmit: any;

  constructor() {
    this.onSubmit = async () => {
      this.res = await createPost(this.content, this.sticky);
    }
  }

  async ngOnInit() {
    this.isLoggedIn = await isLoggedIn();

    if (!this.isLoggedIn) {
      this.goToPage("/forbidden");
    }
  }

  ngAfterViewInit() {
    const easyMDE = new EasyMDE(
      {
        toolbar: ["bold", "italic", "heading", "|",
          "quote", "unordered-list", "ordered-list", "|",
          "link", "image", "|", "guide"]
      }
    );
  }

}
