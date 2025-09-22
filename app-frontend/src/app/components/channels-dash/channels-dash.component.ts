import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Channels } from 'src/app/channels';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-channels-dash',
  templateUrl: './channels-dash.component.html',
  styleUrls: ['./channels-dash.component.css']
})
export class ChannelsDashComponent implements OnInit{
  channels!: Channels[];

  constructor(private dashboardService: DashboardService, private router: Router) {}

  ngOnInit(): void {
   this.dashboardService.getChannels().subscribe(response => {
    this.channels = response
    console.log(response)
   }, error => {
    console.log(error)
   }) 
  }

  onSubmit(channelId: string,channelName: string) {
    this.router.navigate(['/channels',channelId,'posts'],{queryParams: {name: channelName}})
  }

}
