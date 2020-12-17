import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeacherProfileComponent} from './teacher-profile.component';


const routes: Routes = [
  {
    path: '',
    component: TeacherProfileComponent,
    data: {
      title: 'Teacher Profile'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherProfileRoutingModule { }
