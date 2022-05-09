import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getSelf } from 'src/app/api/auth';
import { GlobalConstants } from 'src/app/api/global.constants';
import { deletePost, getPost, Post } from 'src/app/api/post';
import { Role, User } from 'src/app/api/user';

@Component({
    selector: 'app-post-info',
    templateUrl: './post-info.component.html',
    styleUrls: ['./post-info.component.scss']
})
export class PostInfoComponent implements OnInit {
    post: Post | undefined;

    loggedUser: User | undefined;
    isAdmin: boolean = false;
    isAuthor: boolean = false;

    formatDate = GlobalConstants.formatDate;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    async ngOnInit() {
        let strId: string = <string>this.route.snapshot.paramMap.get("id");
        this.post = await getPost(+strId);

        this.loggedUser = await getSelf();
        this.isAdmin = this.loggedUser.role === Role.ADMIN;
        this.isAuthor = this.loggedUser.username == this.post.author.username;
    }

    async confirmDeletePost() {
        if (confirm(`Are you sure you want to delete this post: ${this.post?.title}`)) {
            await deletePost(this.post!.id);
            this.router.navigate(["/forum/home"]);
        }
    }
}
