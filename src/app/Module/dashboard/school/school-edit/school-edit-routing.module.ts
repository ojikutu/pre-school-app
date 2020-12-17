import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SchoolEditComponent} from './school-edit.component';


const routes: Routes = [
  {
    path: '',
    component: SchoolEditComponent,
    data: {
      title: 'School Management'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolEditRoutingModule { }
