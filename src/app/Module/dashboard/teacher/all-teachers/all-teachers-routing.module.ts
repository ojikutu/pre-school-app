import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllTeachersComponent} from './all-teachers.component';


const routes: Routes = [
  {
    path: '',
    component: AllTeachersComponent,
    data: {
      title: 'Teacher Management'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllTeachersRoutingModule { }
