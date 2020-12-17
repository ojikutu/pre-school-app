import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllSchoolsComponent} from './all-schools.component';


const routes: Routes = [
  {
    path: '',
    component: AllSchoolsComponent,
    data: {
      title: 'School Management'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllSchoolsRoutingModule { }
