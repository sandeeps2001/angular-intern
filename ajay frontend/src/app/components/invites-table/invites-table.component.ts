import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Invite } from 'src/app/invites';
import { MatDialog } from '@angular/material/dialog';
import { EditInviteComponent } from '../edit-invite/edit-invite.component';

@Component({
  selector: 'app-invites-table',
  templateUrl: './invites-table.component.html',
  styleUrls: ['./invites-table.component.css'],
})

export class InvitesTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'channels', 'status'];
  columnsToDisplay = [...this.displayedColumns, 'action']
  dataSource: Invite[] = [];

  constructor(private dashboardService: DashboardService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dashboardService.getInvites()
      .subscribe(response => {
        this.dataSource = response
      }, error => {
        console.log(error)
      })
  }

  getformattedChannelName(invite: Invite): string {
    return invite.channels.map(channel => channel.name).join(', ')
  }

  openDialog(element?: Invite) {
    const dialogRef = this.dialog.open(EditInviteComponent, {
      data: element
    });

    dialogRef.componentInstance.onUpdateInvite.subscribe(response => {
      this.updateInvite(response)
      dialogRef.close()
    })

    dialogRef.componentInstance.onCreateInvite.subscribe(response => {
      this.createInvite(response)
      dialogRef.close()
    })

  }

  createInvite(invite: Invite) {
    this.dashboardService.createInvites(invite).subscribe(response => {
      this.dataSource.push(response)
      this.dataSource = this.dataSource.slice()
    }, error => {
      console.log(error)
    })
  }

  updateInvite(updatedInvite: Invite) {
    this.dashboardService.updateInvites(updatedInvite).subscribe(response => {

      console.log('Response from Update controller', response)
      const updatedIndex = this.dataSource.findIndex(invite => invite._id === response._id)

      if (updatedIndex !== -1) {
        console.log('Index Found')
        this.dataSource[updatedIndex].name = response.name
        this.dataSource[updatedIndex].email = response.email
        this.dataSource[updatedIndex].channels = response.channels.map(channel => ({
          _id: channel._id,
          name: channel.name,
          description: channel.description
        }))
        console.log('Updated Channels',this.dataSource[updatedIndex].channels)
        this.dataSource[updatedIndex].permissions = updatedInvite.permissions
      }
    })
  }
}
