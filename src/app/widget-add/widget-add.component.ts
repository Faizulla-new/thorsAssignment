import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { WidgetService } from '../services/widget.service';

@Component({
  selector: 'app-widget-add',
  templateUrl: './widget-add.component.html',
  styleUrls: ['./widget-add.component.css']
})
export class WidgetAddComponent implements OnInit {
  widgetForm!: FormGroup;
  initialValues:any;
  formsubmit:boolean = false;
  addRowItem: any[] = [];
  name = '';
  desc = '';
  optional = false;
  edit : any = false;
  widgets: any;
  constructor(private formBuilder: FormBuilder, private widgetServ: WidgetService, private route: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.edit = this.activeRoute.snapshot.paramMap.get('edit');
    if (this.edit == 'true') {
      this.getEditedData();
    }
    this.widgetForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      count: ['', [Validators.required]]
    });
    this.initialValues = this.widgetForm.value;
  }

  getEditedData(){
    var id = this.activeRoute.snapshot.paramMap.get('id');
    this.widgetServ.getWidgetDataDetails(id).subscribe((res: any) => {
      this.widgets = res;
      this.widgetForm.patchValue({
        name: res.name,
      description: res.description,
      count: res.count
      })
      this.addRowItem = res.components;
      console.log(res);

    }, (error: any) => {
      //console.log(error);
    })
  }

  get addCateFormCnt(){
    return this.widgetForm.controls;
  }

  widgetSubmit(){
    if (this.widgetForm.invalid) {
      return;
    }



    if (this.addRowItem.length) {
      this.addRowItem.map( repo => {
        repo.optional = repo.optional == 'true' ? true: false;
      })
    }else{
      this.errorMessageAlert('Please add atleast one component');
      return;
    }

    if (this.edit == 'true' ) {
      var editedwidgets = {
        name: this.widgetForm.value.name,
        description: this.widgetForm.value.description,
        count: this.widgetForm.value.count,
        components:   this.addRowItem
      }
      this.widgetForm.value.components = this.addRowItem;
      var id = this.activeRoute.snapshot.paramMap.get('id');
      this.widgetServ.editWidget(editedwidgets, id).subscribe((res: any) => {
        this.route.navigate(['/'])
      }, (error: any) => {
        console.log(error);
      })
    } else {
      this.widgetForm.value.components = this.addRowItem;

      this.widgetServ.addWidget(this.widgetForm.value).subscribe((res: any) => {
        this.route.navigate(['/'])
      }, (error: any) => {
        console.log(error);
      })
    }



  }

  errorMessageAlert(message: any) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: true,
      timer: 3000
    })
  }

     // Accept Input As a Number Only
 numericOnly(event:any): boolean {
  let patt = /^([0-9])$/;
  let result = patt.test(event.key);
  return result;
}

deleteMeasurements(index: any){
  this.addRowItem.splice(index, 1);
}

addNewCompany(){
if (this.name == '' || this.desc == '' ) {
  return;
}
this.addRowItem.push({name:this.name, description:this.desc,optional: this.optional })
this.name = '' ;
 this.desc = '';
 this.optional = false;

}
resetForm(){
  this.name = '' ;
 this.desc = '';
 this.optional = false;
 this.addRowItem = [];
}

}
