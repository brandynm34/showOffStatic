import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-edit-portfolio',
  templateUrl: './edit-portfolio.component.html',
  styleUrls: ['./edit-portfolio.component.css']
})
export class EditPortfolioComponent implements OnInit {
  display="block";
  constructor(private dash: DashboardComponent) { }

  ngOnInit() {
  }
  closeModal(){
    this.dash.display = "none";
    console.log('edit',this.display);
    
  }
  save(){
    this.dash.display = "none";
    console.log(this.display);
  }


}
