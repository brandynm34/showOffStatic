import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-pic-modal',
  templateUrl: './pic-modal.component.html',
  styleUrls: ['./pic-modal.component.css']
})
export class PicModalComponent implements OnInit {
  display = 'block';

  constructor(private dash: DashboardComponent) { }

  ngOnInit() {
  }
  closeModal() {
    this.dash.displayPicture = 'none' ;
  }

}
