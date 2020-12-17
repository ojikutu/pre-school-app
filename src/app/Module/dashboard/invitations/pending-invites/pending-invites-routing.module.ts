import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PendingInvitesComponent} from './pending-invites.component';


const routes: Routes = [
  {
    path: '',
    component: PendingInvitesComponent,
    data: {
      title: 'Pending Invitations'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingInvitesRoutingModule { }
