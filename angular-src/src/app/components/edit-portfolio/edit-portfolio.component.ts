import { Component, OnInit } from '@angular/core';
// import { DashboardComponent } from './../dashboard/dashboard.component';

@Component({
  selector: 'app-edit-portfolio',
  templateUrl: './edit-portfolio.component.html',
  styleUrls: ['./edit-portfolio.component.css']
})
export class EditPortfolioComponent implements OnInit {
  public display = 'block';

  // constructor(private dash: DashboardComponent) { }

  ngOnInit() {
  }
  closeModal() {
    // this.dash.displayPortfolio = 'none';
  }
  save() {
    // this.dash.displayPortfolio = 'none';

  }


}
