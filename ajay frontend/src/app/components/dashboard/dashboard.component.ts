import { Component, OnInit } from '@angular/core';
import { Invite } from 'src/app/invites';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  invites: Invite[] = []

  constructor(private dashboardService: DashboardService){}

  ngOnInit(): void {
    this.dashboardService.getInvites()
      .subscribe(response =>{
        this.invites = response
      }, error => {
        console.log('error')
      })
  }
}
