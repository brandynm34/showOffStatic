import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-view',
  templateUrl: './public-view.component.html',
  styleUrls: ['./public-view.component.css']
})
export class PublicViewComponent implements OnInit {

  private _numOfSkills = 6;
  private _numOfProjects = 6;
  public skillsArr = [];
  public projectsArr = [];
  constructor() { }

  ngOnInit() {
    for (let i = 0; i < this._numOfSkills; i++) {
      this.skillsArr.push('Skill!');
    }

    for (let i = 0; i < this._numOfProjects; i++) {
      this.projectsArr.push('Project!');
    }
  }

}
