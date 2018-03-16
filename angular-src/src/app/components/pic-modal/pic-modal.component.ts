import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm} from '@angular/forms';

@Component({
  selector: 'app-pic-modal',
  templateUrl: './pic-modal.component.html',
  styleUrls: ['./pic-modal.component.css']
})
export class PicModalComponent implements OnInit {
  display = 'block';
  form: FormGroup;
  UserPhoto: String;
  PhotoName: String;
  public file;
  protected reader;

  // loading: boolean = false;
  url = '../assets/img/website/employees.png';
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(private dash: DashboardComponent, fb: FormBuilder) {}

  ngOnInit() {
  }
  closeModal() {
    this.dash.displayPicture = 'none' ;
  }

  readUrl(event: any) {
    const file = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      if (file.type === 'image/jpeg') {
        console.log(file);
        const reader = new FileReader();

        reader.onload = (readerEvent: any) => {
          this.url = readerEvent.target.result;

          console.log('file uploaded', file);
          console.log('file name', file.name);
        };

      }

      this.reader.readAsDataURL(event.target.files[0]);
    }

  }

  onSubmit() {
    // this.dash.displayPicture = 'none'
  }

}
