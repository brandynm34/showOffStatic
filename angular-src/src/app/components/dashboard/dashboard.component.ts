import { Component, OnInit } from '@angular/core';
// import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  display='none';
  // display= 'none';


  constructor() {}


  ngOnInit() {
  }
  openEditProfileModal(){
    this.display="block"
    console.log("dash", this.display, this.display1);
  }
  openEditPortfolioModal(){
    this.display="block"
    console.log("dash", this.display);
  }
  
 
}

