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
  isAdmin: boolean = false;

  content : EasyMDE | any;

  goToPage = GlobalConstants.goToPage;
  res: PostCreateResult | null = null;
  error: boolean = false;

  isSticky: boolean = false;

  onSubmit: any;

  constructor() {
    this.onSubmit = async (postForm: any) => {
      this.error = false;
      
      if (postForm.value["title"] && this.content.value()) {
        if (this.isSticky)
          this.res = await createPost(postForm.value["title"], this.content.value(), true);
        else
          this.res = await createPost(postForm.value["title"], this.content.value(), false);

        this.goToPage(`/forum/home`);
      } else {
        this.error = true;
      }
    }
  }

  async ngOnInit() {
    this.isLoggedIn = await isLoggedIn();

    if (!this.isLoggedIn) {
      this.goToPage("/forbidden");
    }

    if (GlobalConstants.isSticky) {
      this.isSticky = true;
      GlobalConstants.isSticky = false;
    }
  }

  ngAfterViewInit() {
    this.content = new EasyMDE(
      {
        toolbar: ["bold", "italic", "heading", "|",
          "quote", "unordered-list", "ordered-list", "|",
          "link", "image", "|", "guide"]
      }
    );
  }

}
