import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateStudentComponent} from './create-student.component';


const routes: Routes = [
  {
    path: '',
    component: CreateStudentComponent,
    data: {
      title: 'Create Student Profile'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateStudentRoutingModule { }
