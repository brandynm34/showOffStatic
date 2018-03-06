
import { Component, OnInit } from '@angular/core';
import { Portfolio, PortfolioService } from './portfolio_base.service';
import { PortfolioPublicService } from './portfolio_public.service';

@Component({
  selector: 'app-portfolio',
  template: `
    <div *ngFor="let portfolio of portfolios">
      <!--<h3>{{ portfolio._id }}</h3>
      <p>{{ portfolio.user_id }}</p>-->
      <p>{{ portfolio.AboutBlurb }}</p>
      <p>{{ portfolio.Facebook }}</p>
      <p>{{ portfolio.Twitter }}</p>
      <p>{{ portfolio.Icon }}</p>
      <p>{{ portfolio.PhoneNumber }}</p>
      <p>{{ portfolio.NumOfProjects }}</p>
      <p>{{ portfolio.ProjectArray }}</p>
      <p>{{ portfolio.SkillArray }}</p>
      <p>{{ portfolio.Theme }}</p>
    </div>
  `,
  providers: [
    { provide: PortfolioService, useClass: PortfolioPublicService }
  ]
})
export class PortfolioComponent implements OnInit {
  portfolios: Portfolio[];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolios = this.portfolioService.getPortfolios();
  }
}
