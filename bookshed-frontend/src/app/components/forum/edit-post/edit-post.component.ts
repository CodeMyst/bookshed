import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as EasyMDE from 'easymde';
import { editPost, getPost, Post, PostCreateResult } from 'src/app/api/post';

@Component({
    selector: 'app-edit-post',
    templateUrl: './edit-post.component.html',
    styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
    post: Post | undefined;

    res: PostCreateResult | undefined;

    content: EasyMDE | any;

    postEditedSticky: boolean = false;
    postEditedTitle: string = "";

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    async ngOnInit(): Promise<void> {
        let strId: string = <string>this.route.snapshot.paramMap.get("id");
        this.post = await getPost(+strId);

        this.postEditedSticky = this.post.sticky;
        this.postEditedTitle = this.post.title;

        this.content.value(this.post.content);
    }

    async edit() {
        if (this.content.value() == "" || this.postEditedTitle == "") {
            this.res = {
                message: "Fields cannot be empty",
                post: null,
                success: false
            }
            return;
        }

        this.res = await editPost(this.post!.id, this.postEditedTitle, this.content.value(), this.postEditedSticky);

        if (this.res && this.res.success) {
            this.router.navigate([`/forum/${this.post?.id}`]);
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
