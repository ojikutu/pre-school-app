import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignedClassRoutingModule } from './assigned-class-routing.module';
import { AssignedClassComponent } from './assigned-class.component';
import {PageTitleModule} from '../../../../Layout/Components/page-title/page-title.module';
import {DashboardModule} from '../../dashboard.module';
import {DataTablesModule} from 'angular-datatables';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AssignedClassComponent],
  imports: [
    CommonModule,
    AssignedClassRoutingModule,
    PageTitleModule,
    DashboardModule,
    DataTablesModule,
    FontAwesomeModule,
    NgbTooltipModule
  ]
})
export class AssignedClassModule { }
