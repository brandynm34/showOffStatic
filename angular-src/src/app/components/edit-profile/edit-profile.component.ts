import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  display="block";
  constructor(private dash: DashboardComponent) { }

  ngOnInit() {
  }



// Function to open modal
 
  closeModal(){
    this.dash.display = "none";
    console.log('edit',this.display);
    
  }
  save(){
    this.dash.display = "none";
    console.log(this.display);
  }

}

