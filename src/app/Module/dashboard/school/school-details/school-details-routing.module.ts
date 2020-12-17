import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SchoolDetailsComponent} from './school-details.component';


const routes: Routes = [
  {
    path: '',
    component: SchoolDetailsComponent,
    data: {
      title: 'School Management'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolDetailsRoutingModule { }
