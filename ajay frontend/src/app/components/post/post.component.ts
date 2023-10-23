import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Post } from 'src/app/post';
import { CreatepostsComponent } from '../createposts/createposts.component';
import { DeleteWarningComponent } from '../delete-warning/delete-warning.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post!: Post;
  @Input() permissions!: Array<any>;
  @Output() postUpdates: EventEmitter<Post> = new EventEmitter<Post>();
  @Output() postDelete: EventEmitter<string> = new EventEmitter();

  constructor(public dialog: MatDialog){}

  openEditDialog(post: Post) {
    const dialogRef = this.dialog.open(CreatepostsComponent,{
      data: post
    })

    dialogRef.componentInstance.onUpdatePosts.subscribe(response => {
      this.postUpdates.emit(response)
      dialogRef.close()
    })

  }

  openDeleteDialog(post: Post) {
    const dialogRef = this.dialog.open(DeleteWarningComponent,{
      data: post
    })

    dialogRef.componentInstance.onDeletePost.subscribe(response => {
      this.postDelete.emit(response)
      dialogRef.close()
    })
  }

  updatePosts(post: Post){
    this.postUpdates.emit(post)
  }

  deletePosts(channelId: string){
    this.postDelete.emit(channelId)
  }
}
