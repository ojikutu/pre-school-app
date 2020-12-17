import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcceptInvitesRoutingModule } from './accept-invites-routing.module';
import { AcceptInvitesComponent } from './accept-invites.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [AcceptInvitesComponent],
    exports: [
        AcceptInvitesComponent
    ],
  imports: [
    CommonModule,
    AcceptInvitesRoutingModule,
    ReactiveFormsModule
  ]
})
export class AcceptInvitesModule { }
