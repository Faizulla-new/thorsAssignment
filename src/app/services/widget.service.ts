import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  widgeturl  = environment.apiURL;

  constructor(private http: HttpClient) { }


  statusChangeAlert(message: any) {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }



getWidgetData() {
  return this.http.get<any>(this.widgeturl + `widgets`  ).pipe(map(res => {
    return res;
  }, (error: any) => {
    return error;
  }));
}

deleteWidget(id: any) {
  return this.http.delete<any>(this.widgeturl + `widgets/` + id  ).pipe(map(res => {
    this.statusChangeAlert('Widget Deleted Sucessfully');
    return res;
  }, (error: any) => {
    return error;
  }));
}

getWidgetDataDetails(id: any){
  return this.http.get<any>(this.widgeturl + `widgets/` + id  ).pipe(map(res => {
    return res;
  }, (error: any) => {
    return error;
  }));
}

addWidget(formvalue: any){
  return this.http.post<any>(this.widgeturl + `widgets`, formvalue  ).pipe(map(res => {
    this.statusChangeAlert('Widget Data Added Sucessfully');
    return res;
  }, (error: any) => {
    // this.statusChangeAlert(error.error.message);
    return error;
  }));
}

editWidget(formvalue: any, id: any){
  return this.http.put<any>(this.widgeturl + `widgets/` + id, formvalue  ).pipe(map(res => {
    this.statusChangeAlert('Widget Data Edited Sucessfully');
    return res;
  }, (error: any) => {
    return error;
  }));
}

getComponentData() {
  return this.http.get<any>(this.widgeturl + `components`  ).pipe(map(res => {
    return res;
  }, (error: any) => {
    return error;
  }));
}

}
