import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'frontend';
  modalOpen: boolean = false;
  modalId: string = 'my_modal_1';

  ngOnInit(): void {
    initFlowbite();
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }
}
