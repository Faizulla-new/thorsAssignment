import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WidgetService } from '../services/widget.service';

@Component({
  selector: 'app-widget-details',
  templateUrl: './widget-details.component.html',
  styleUrls: ['./widget-details.component.css']
})
export class WidgetDetailsComponent implements OnInit {

  widgets:any;

  constructor(private widgetServ: WidgetService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    var id = this.activeRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.getWidgetDataDetails(id);
  }

  getWidgetDataDetails(id: any){
    this.widgetServ.getWidgetDataDetails(id).subscribe((res: any) => {
      this.widgets = [res];
      console.log(res);

    }, (error: any) => {
      //console.log(error);
    })
  }

}
