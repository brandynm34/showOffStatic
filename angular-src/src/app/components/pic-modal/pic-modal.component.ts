import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PhotoService } from './../../services/photo.service';

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
  public fileToUpload: File;

  // loading: boolean = false;
  url = '../assets/img/website/employees.png';
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(private dash: DashboardComponent, fb: FormBuilder, private _photo: PhotoService) {}

  ngOnInit() {
  }
  closeModal() {
    this.dash.displayPicture = 'none' ;
  }

  public upload() {
    console.log('Uploading...');
    console.log('File to upload!:', this.fileToUpload);
    this._photo.uploadPhoto(this.fileToUpload).subscribe(result => {
      console.log('result:', result);
    });
    this.dash.displayPicture = 'none';
  }

  readUrl(event: any) {
    const file = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      if (file.type === 'image/jpeg') {
        console.log(file);
        this.fileToUpload = <File> event.target.files[0];

        reader.onload = (readerEvent: any) => {
          this.url = readerEvent.target.result;

          console.log('file uploaded', file);
          console.log('file name', file.name);
        };

      } else {
        console.log('Invalid file type');
      }
      reader.readAsDataURL(event.target.files[0]);
    }

  }

  onSubmit() {

    // this.dash.displayPicture = 'none'
  }

}
