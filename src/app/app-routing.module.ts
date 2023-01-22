import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WidgetAddComponent } from './widget-add/widget-add.component';
import { WidgetDetailsComponent } from './widget-details/widget-details.component';
import { WidgetListComponent } from './widget-list/widget-list.component';

const routes: Routes = [
  { path: '' , component: WidgetListComponent },
  { path: 'details' , component: WidgetDetailsComponent },
  { path: 'add' , component: WidgetAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
