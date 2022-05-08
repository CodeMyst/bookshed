import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { isLoggedIn } from 'src/app/api/auth';
import { getPosts, getReplies, Post, Reply } from 'src/app/api/post';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  posts: Post[] = [];
  replies: number[] = [];
  isLoggedIn: boolean = false;

  constructor() { }

  async ngOnInit() {
    this.isLoggedIn = await isLoggedIn();

    this.posts = await getPosts();

    for (const post of this.posts) {
      this.replies.push((await getReplies(post.id)).length);
    }
  }

  formatDate(date: Date): string {
    const datepipe: DatePipe = new DatePipe('en-US');
    let formatedDate: string | null = datepipe.transform(date, 'dd/MM/YYYY');
    return formatedDate != null ? formatedDate : "unknown";
  }

}
