
import { Injectable } from '@angular/core';
import { Portfolio, PortfolioService } from './portfolio_base.service';

@Injectable()
export class PortfolioPublicService implements PortfolioService {
  getPortfolios() {
    const portfolios: Portfolio[] = [{
      // _id: String,
      // user_id: String,
      AboutBlurb: null,
      Facebook: null,
      Twitter: null,
      Icon: null,
      PhoneNumber: null,
      NumOfProjects: 6,
      ProjectArray: null,
      SkillArray: null,
      Theme: null,
      }
    ];
    return portfolios;
  }
}
