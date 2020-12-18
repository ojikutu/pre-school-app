import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllStudentsRoutingModule } from './all-students-routing.module';
import { AllStudentsComponent } from './all-students.component';
import {PageTitleModule} from '../../../../Layout/Components/page-title/page-title.module';
import {DashboardModule} from '../../dashboard.module';
import {DataTablesModule} from 'angular-datatables';


@NgModule({
  declarations: [AllStudentsComponent],
  imports: [
    CommonModule,
    AllStudentsRoutingModule,
    PageTitleModule,
    DashboardModule,
    DataTablesModule
  ]
})
export class AllStudentsModule { }
