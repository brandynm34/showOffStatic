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
  loading: boolean = false;
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(private dash: DashboardComponent, fb: FormBuilder) {
    // this.form = fb.group(
    //   {
    //     fileInput: ['', Validators.required, Validators ]
    //   })
    // this.createForm()
    this.form = fb.group({
      // name: ['', Validators.required],
      profile_pic: null
    })   
   }
 
  ngOnInit() {
  }
  closeModal() {
    this.dash.displayPicture = 'none' ;
  }
  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('profile_pic').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
    }
  }
  onSubmit() {
    const formModel = this.form.value;
    this.loading = true;
    // this.http.post('apiUrl', formModel)
    setTimeout(() => {
      console.log(formModel);
      alert('done!');
      this.loading = false;
    }, 1000);
  }
}
