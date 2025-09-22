import { Component, EventEmitter, Input, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/post';

@Component({
  selector: 'app-createposts',
  templateUrl: './createposts.component.html',
  styleUrls: ['./createposts.component.css']
})
export class CreatepostsComponent implements OnInit {
  @Output() onCreatePosts: EventEmitter<Post> = new EventEmitter();
  @Output() onUpdatePosts: EventEmitter<Post> = new EventEmitter();

  postTitle!: string;
  postDescription!: string;
  formValue!: Post;
  isUpdateForm: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public post: Post) {
  }

  ngOnInit(): void {
    if (Object.keys(this.post).length !== 0) {
      this.isUpdateForm = true
      this.postTitle = this.post.title;
      this.postDescription = this.post.description;
    }
  }

  onSubmit() {
    if (this.isUpdateForm) {
      this.formValue = {
        _id: this.post?._id,
        title: this.postTitle,
        description: this.postDescription
      }
      this.onUpdatePosts.emit(this.formValue)
      return;
    }

    console.log('Create Post')
    const formValue = {
      title: this.postTitle,
      description: this.postDescription
    }

    this.onCreatePosts.emit(formValue)

    this.postTitle = ''
    this.postDescription = ''
  }

}
