// my-chart.component.ts
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
@Component({
  selector: 'app-my-chart',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.css'],
  
})


export class MyChartComponent implements OnInit {
  g = '200'
  index = 0

  constructor() {

  }
  options = ['3months', '6months', '1Year' ,'custom'];
  
  handleIndexChange(e: number): void {
    this.index = e
    console.log(e);
  }
  fetchf(event:any){
    console.log('h',event)
  }
  ngOnInit(): void {

    console.log("chart comp loaded")
    new Chart("MyChart8", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      
    });
  




    const xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
    const yValues = [15,85];
    const barColors = [
      "blue",
      'lightgreen',
      "#2b5797",
      "#e8c3b9",
      "#1e7145"
    ];
    new Chart("myChart", {
      type: "doughnut",
      data: {
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
  
    });
    new Chart("myChart1", {
      type: "doughnut",
      data: {
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      
    
  
    });
    new Chart("myChart2", {
      type: "doughnut",
      data: {
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
  
    });

  
  new Chart('myChart3', {
    type: 'bar',
    data: {
       labels: ["HTML", "CSS", "JAVASCRIPT", "CHART.JS", "JQUERY", "BOOTSTRP"],
       datasets: [{
          label: "online tutorial subjects",
          data: [20, 40, 30, 35, 30, 20],
          backgroundColor: ["blue",'lightgreen'],
          borderWidth: 2,
          barThickness:25,
          hoverBackgroundColor:'white',
          
       }],
    },
})

new Chart('myChart4', {
  type: 'bar',
  data: {
     labels: ["HTML", "CSS", "JAVASCRIPT", "CHART.JS", "JQUERY", "BOOTSTRP"],
     datasets: [{
        label: "online tutorial subjects",
        data: [20, 40, 30, 35, 30, 20],
        backgroundColor: ["blue",'lightgreen'],
        borderWidth: 2,
     }],
  },
})
  }
}
