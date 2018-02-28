import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  display='none';

  constructor() {}

  ngOnInit() {
  }
  openModal(){
    this.display="block"
    console.log("hello");
  }
  onCloseHandled(){
    this.display="none"
  }
 
}

