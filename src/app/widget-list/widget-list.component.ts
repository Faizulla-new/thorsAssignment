import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { WidgetService } from '../services/widget.service';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  widgets: any[] = [];
  component: any[] = [];

  constructor(private widgetServ: WidgetService, private router: Router) {
    this.getWidgetData();
    this.getComponentData();
  }

  ngOnInit(): void {
  }

  getWidgetData(){
    this.widgetServ.getWidgetData().subscribe((res: any) => {
      this.widgets = res;
      console.log(res);

    }, (error: any) => {
      //console.log(error);
    })
  }

  getComponentData(){
    this.widgetServ.getComponentData().subscribe((res: any) => {
      this.component = res;
      console.log(res);

    }, (error: any) => {
      //console.log(error);
    })
  }

  addWidgetData(id: any, edit:boolean){
    this.router.navigate(['add', {id: id, edit:edit}])
  }

  viewWidgetData(id: any){
    this.router.navigate(['details', {id: id}])
  }

    // Delete Confirmation Alert //
    deleteWidgetAlert(index: any) {
      Swal.fire({
        title: 'Are you sure to Delete This Widget?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {

          this.deleteWidget(index);
        }
      })
    }

    // Delete Permissions From User data //
    deleteWidget(index: any) {
      this.widgetServ.deleteWidget(index).subscribe((res: any) => {
        this.getWidgetData();
      }, (error: any) => {
        console.log(error);
      })
    }

}
