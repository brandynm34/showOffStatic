import { Component, OnInit } from '@angular/core';
import { PhotoService } from './../../services/photo.service';
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
  public bgImage: any;
  constructor(private _photo: PhotoService) {}

  ngOnInit() {
    this._photo.retrievePhoto().subscribe(result => {
      this.blobToImage(result);
    });
  }

  public blobToImage(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.bgImage = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  openEditProfileModal() {
    this.displayProfile = 'block';
  }

  openEditPortfolioModal() {
    this.displayPortfolio = 'block';
  }
  openEditPictureModal(){
    this.displayPicture = 'block';
    // console.log('diplayed', this.displayPicture)
  }
}

