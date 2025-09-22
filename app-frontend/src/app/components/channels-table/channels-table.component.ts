import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Channels } from 'src/app/channels';
import { MatDialog } from '@angular/material/dialog';
import { DeleteWarningComponent } from '../delete-warning/delete-warning.component';
import { CreateChannelComponent } from '../create-channel/create-channel.component';

@Component({
  selector: 'app-channels-table',
  templateUrl: './channels-table.component.html',
  styleUrls: ['./channels-table.component.css']
})
export class ChannelsTableComponent implements OnInit {
  // channels: Channels[] = []
  successMsg!: string;
  errorMsg!: string;

  displayedColumns: string[] = ['name', 'createdBy', 'createdAt'];
  columnsToDisplay = [...this.displayedColumns, 'action']
  channels: Channels[] = [];

  constructor(private dashboardService: DashboardService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dashboardService.getChannels().subscribe(response => {
          this.channels = response
        }, error => {
          console.log(error)
        })
  }

  openDeleteDialog(element?: Channels){
    const dialogRef = this.dialog.open(DeleteWarningComponent, {
      data: element
    })

    dialogRef.componentInstance.onDeletePost.subscribe(response => {
      this.deleteChannel(response)
      dialogRef.close()
    })
  }

  deleteChannel(channelId: string){
    this.dashboardService.deleteChannel(channelId).subscribe(response => {
      console.log('Delete Channel', response)
      this.channels = this.channels.filter(channel => channel._id !== channelId)
    })
  }

  openCreateDialog(){
    const dialogRef = this.dialog.open(CreateChannelComponent)

    dialogRef.componentInstance.onCreateChannel.subscribe(response => {
      this.createChannel(response)
      dialogRef.close()
    })

  }

  createChannel(channel: Channels) {
      this.dashboardService.createChannel(channel).subscribe(response => {
        this.errorMsg = ''
        this.successMsg = 'Created Channel Successfully!!!'
        this.channels.push(response)
        this.channels = this.channels.slice()
      }, error => {
        this.successMsg = ''
        this.errorMsg = 'Error creating channel. Check name of channel!!'
        console.log(error)
      })
    }
}
