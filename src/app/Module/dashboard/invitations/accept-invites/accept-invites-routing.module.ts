import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AcceptInvitesComponent} from './accept-invites.component';


const routes: Routes = [
  {
    path: '',
    component: AcceptInvitesComponent,
    data: {
      title: 'Accept Invitation'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcceptInvitesRoutingModule { }
