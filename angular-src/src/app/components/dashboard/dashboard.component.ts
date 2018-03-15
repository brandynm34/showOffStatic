import { Component, OnInit } from '@angular/core';
// import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayProfile = 'none';
  displayPortfolio = 'none';
  displayPicture = 'none';
  constructor() {}

  ngOnInit() {
  }
  openEditProfileModal() {
    this.displayProfile = 'block';
  }

  openEditPortfolioModal() {
    this.displayPortfolio = 'block';
  }
  openEditPictureModal(){
    this.displayPicture = 'block';
    console.log('diplayed', this.displayPicture)
  }
}

