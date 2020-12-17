import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingInvitesRoutingModule } from './pending-invites-routing.module';
import { PendingInvitesComponent } from './pending-invites.component';
import {PageTitleModule} from '../../../../Layout/Components/page-title/page-title.module';
import {DashboardModule} from '../../dashboard.module';
import {DataTablesModule} from 'angular-datatables';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {AcceptInvitesModule} from '../accept-invites/accept-invites.module';


@NgModule({
  declarations: [PendingInvitesComponent],
  imports: [
    CommonModule,
    PendingInvitesRoutingModule,
    PageTitleModule,
    DashboardModule,
    DataTablesModule,
    FontAwesomeModule,
    NgbTooltipModule,
    AcceptInvitesModule
  ]
})
export class PendingInvitesModule { }
