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

  closeModal(){
    this.dash.displayProfile = "none";
    
  }
  save(){
    this.dash.displayProfile = "none";
    
  }

}

