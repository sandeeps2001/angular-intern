import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Channels } from 'src/app/channels';
import { Post } from 'src/app/post';

@Component({
  selector: 'app-delete-warning',
  templateUrl: './delete-warning.component.html',
  styleUrls: ['./delete-warning.component.css']
})

export class DeleteWarningComponent implements OnInit {
  @Input() channelId!: string;
  @Output() onDeletePost: EventEmitter<string> = new EventEmitter<string>();

  constructor(@Inject(MAT_DIALOG_DATA) public channel: Channels, @Inject(MAT_DIALOG_DATA) public post: Post) {}

  ngOnInit(): void {
    
  }

  onConfirm(channelId: string){
    this.onDeletePost.emit(channelId)
  }
}
