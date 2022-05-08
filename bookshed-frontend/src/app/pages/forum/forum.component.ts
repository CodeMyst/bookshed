import { Component, OnInit } from '@angular/core';
import { isLoggedIn } from 'src/app/api/auth';
import { GlobalConstants } from 'src/app/api/global.constants';
import { getPosts, getReplies, Post } from 'src/app/api/post';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  posts: Post[] = [];
  replies: number[] = [];
  isLoggedIn: boolean = false;

  formatDate = GlobalConstants.formatDate;

  constructor() { }

  async ngOnInit() {
    this.isLoggedIn = await isLoggedIn();

    this.posts = await getPosts();

    for (const post of this.posts) {
      this.replies.push((await getReplies(post.id)).length);
    }
  }

}
