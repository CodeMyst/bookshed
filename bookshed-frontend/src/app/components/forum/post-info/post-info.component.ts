import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalConstants } from 'src/app/api/global.constants';
import { getPost, Post } from 'src/app/api/post';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss']
})
export class PostInfoComponent implements OnInit {

  post: Post | any;

  formatDate = GlobalConstants.formatDate;

  constructor(private route: ActivatedRoute) { }

  async ngOnInit() {
    let strId: string = <string>this.route.snapshot.paramMap.get("id");
    this.post = await getPost(+strId);
  }

}
