import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Channels } from 'src/app/channels';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.css']
})
export class CreateChannelComponent {
  @Output() onCreateChannel: EventEmitter<Channels> = new EventEmitter();
  channelName!: string;
  channelDesc!: string;


  onSubmit(form: NgForm){
    if(!form.valid){
      return
    }

    const channelName = {
      name: this.channelName,
      description: this.channelDesc
    }

    this.onCreateChannel.emit(channelName)

    this.channelName = ''
    this.channelDesc = ''

  }
}
