import { Component, OnInit } from '@angular/core';
// import { DashboardComponent } from './../dashboard/dashboard.component';
import { JRPortfolioService } from './../../services/portfolio/jr-portfolio-service';

@Component({
  selector: 'app-edit-portfolio',
  templateUrl: './edit-portfolio.component.html',
  styleUrls: ['./edit-portfolio.component.css']
})
export class EditPortfolioComponent implements OnInit {
  public display = 'block';

  // constructor(private dash: DashboardComponent) { }
  constructor ( private _portService: JRPortfolioService) {}

  ngOnInit() {
    // when page loads, grab the necessary values from the database via the service and subscribe to them
    // NOTE: this will automatically grab the user on the service side, whether that is better or doing it here I'm not sure.
    this._portService.getPortfolioInfo().subscribe(result => {
      console.log(result.json());
      const data = result.json().data;
    });

  }
  closeModal() {
    // this.dash.displayPortfolio = 'none';
  }
  save() {
    // this.dash.displayPortfolio = 'none';

  }


}
