import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllChildrenComponent } from './all-children.component';


const routes: Routes = [
  {
    path: '',
    component: AllChildrenComponent,
    data: {
      title: 'Children'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllChildrenRoutingModule { }
