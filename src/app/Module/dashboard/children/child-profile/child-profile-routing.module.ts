import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChildProfileComponent} from './child-profile.component';


const routes: Routes = [
  {
    path: '',
    component: ChildProfileComponent,
    data: {
      title: 'Child Profile'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildProfileRoutingModule { }
