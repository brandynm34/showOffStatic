import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-public-view',
  templateUrl: './public-view.component.html',
  styleUrls: ['./public-view.component.css']
})
export class PublicViewComponent implements OnInit, AfterViewInit {

  private _numOfSkills = 10;
  private _numOfProjects = 4;
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

  ngAfterViewInit() {
    switch (this.projectsArr.length) {
      case 1:
      document.getElementById('project0').classList.add('col-sm-4', 'offset-sm-4');
      break;

      case 2:
      document.getElementById('project0').classList.add('col-sm-4', 'offset-sm-2');
      document.getElementById('project1').classList.add('col-sm-4');
      break;

      case 3:
      document.getElementById('project0').classList.add('col-sm-4');
      document.getElementById('project1').classList.add('col-sm-4');
      document.getElementById('project2').classList.add('col-sm-4');
      break;

      case 4:
      document.getElementById('project0').classList.add('col-sm-4', 'offset-sm-2');
      document.getElementById('project1').classList.add('col-sm-4');
      document.getElementById('project2').classList.add('col-sm-4', 'offset-sm-2');
      document.getElementById('project3').classList.add('col-sm-4');
      break;

      case 5:
      document.getElementById('project0').classList.add('col-sm-4');
      document.getElementById('project1').classList.add('col-sm-4');
      document.getElementById('project2').classList.add('col-sm-4');
      document.getElementById('project3').classList.add('col-sm-4', 'offset-sm-2');
      document.getElementById('project4').classList.add('col-sm-4');
      break;

      case 6:
      for (let i = 0; i < 6; i++) {
        document.getElementById('project' + i).classList.add('col-sm-4');
      }
    }
  }

}
