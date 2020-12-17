import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllStudentsComponent} from './all-students.component';


const routes: Routes = [
  {
    path: '',
    component: AllStudentsComponent,
    data: {
      title: 'All students.'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllStudentsRoutingModule { }
