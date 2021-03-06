import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as EasyMDE from 'easymde';
import { getSelf } from 'src/app/api/auth';
import { GlobalConstants } from 'src/app/api/global.constants';
import { deletePost, deleteReply, getPost, getReplies, Post, Reply, replyPost } from 'src/app/api/post';
import { Role, User } from 'src/app/api/user';

@Component({
    selector: 'app-post-info',
    templateUrl: './post-info.component.html',
    styleUrls: ['./post-info.component.scss']
})
export class PostInfoComponent implements OnInit {
    post: Post | undefined;
    replies: Reply[] = [];

    loggedUser: User | undefined;
    isAdmin: boolean = false;
    isAuthor: boolean = false;

    editor: EasyMDE | any = null;

    formatDate = GlobalConstants.formatDate;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    async ngOnInit() {
        let strId: string = <string>this.route.snapshot.paramMap.get("id");
        this.post = await getPost(+strId);
        this.replies = await getReplies(this.post.id);

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

    async confirmDeleteReply(reply: Reply) {
        if (confirm(`Are you sure you want to delete this reply?`)) {
            await deleteReply(this.post!.id, reply.id);
        }

        this.loadReplies();
    }

    async onPostReply() {
        if (this.editor.value()) {
            await replyPost(this.post!.id, this.editor.value());
            this.editor.value("");
            this.replies = await getReplies(this.post!.id);
        }
    }

    ngAfterViewChecked() {
        const el = document.querySelector(".editor textarea");

        if (el !== null && this.editor === null) {
            this.editor = new EasyMDE({
                toolbar: ["bold", "italic", "heading", "|",
                    "quote", "unordered-list", "ordered-list", "|",
                    "link", "image", "|", "guide"],
                element: el as HTMLElement
            });
        }
    }

    isLoggedUserReviewAuthor(reply: Reply) {
        return reply.author.username == this.loggedUser?.username;
    }

    async loadReplies() {
        this.replies = await getReplies(this.post!.id);
    }
}
