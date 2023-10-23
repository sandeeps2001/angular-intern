import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{Routes,RouterModule} from '@angular/router';
import { MyChartComponent } from '../frontend/frontend.component';
import { LayoutComponent } from './layout.component';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';



const approutes :Routes = [{path : 'chart', component:LayoutComponent, children: [{path: 'chart', component: MyChartComponent}]}]



@NgModule({
  declarations: [LayoutComponent,MyChartComponent],
  imports: [
    CommonModule,
    NzSegmentedModule,
    NzButtonModule,
    FormsModule,
    RouterModule.forChild(approutes)
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule {
  constructor(){
    console.log("layout mod loaded")
  }
 }
