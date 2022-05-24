import { Component, OnInit } from '@angular/core';
import { getSelf, isLoggedIn } from 'src/app/api/auth';
import { GlobalConstants } from 'src/app/api/global.constants';
import { getPosts, getReplies, Post } from 'src/app/api/post';
import { Role } from 'src/app/api/user';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  posts: Post[] = [];
  stickyPost: Post | any;
  replies: number[] = [];

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  setSticky: any;

  formatDate = GlobalConstants.formatDate;

  constructor() {
    this.setSticky = () => {
      GlobalConstants.isSticky = true;
    }
  }

  async ngOnInit() {
    this.isLoggedIn = await isLoggedIn();
    this.isAdmin = (await getSelf()).role === Role.ADMIN;

    this.posts = await getPosts();

    this.posts.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());
    this.posts.sort(function(a, b) { return (a.sticky === b.sticky)? 0 : a.sticky? -1 : 1; })

    for (const post of this.posts) {
      this.replies.push((await getReplies(post.id)).length);
    }
  }

}
