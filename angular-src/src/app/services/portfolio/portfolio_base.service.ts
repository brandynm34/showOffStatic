import { Injectable } from '@angular/core';

export interface Portfolio {
  // _id: String;
  // user_id: String;
  AboutBlurb: String;
  Facebook: String;
  Twitter: String;
  Icon: String;
  PhoneNumber: String;
  NumOfProjects: Number;
  ProjectArray: String;
  SkillArray: String;
  Theme: String;
}

@Injectable()
export abstract class PortfolioService {
  /**
   * Returns a list of all of the current user's portfolio items.
   */
  abstract getPortfolios(): Portfolio[];
}
