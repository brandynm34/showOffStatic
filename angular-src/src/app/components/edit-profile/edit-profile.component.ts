import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  display='none';
  constructor() { }

  ngOnInit() {
  }



// Function to open modal
  openModal(){
    this.display="block"
    console.log("hello");
  }
  onCloseHandled(){
    this.display="none"
  }

}

