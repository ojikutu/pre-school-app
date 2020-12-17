import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AssignedClassComponent} from './assigned-class.component';

const routes: Routes = [
  {
    path: '',
    component: AssignedClassComponent,
    data: {
      title: 'Assigned Classes'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignedClassRoutingModule { }
