import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllClassComponent} from './all-class.component';


const routes: Routes = [
  {
    path: '',
    component: AllClassComponent,
    data: {
      title: 'Class Management'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllClassRoutingModule { }
