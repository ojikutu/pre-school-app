import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllTeachersRoutingModule } from './all-teachers-routing.module';
import { AllTeachersComponent } from './all-teachers.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DashboardModule} from '../../dashboard.module';
import {DataTablesModule} from 'angular-datatables';


@NgModule({
  declarations: [AllTeachersComponent],
  imports: [
    CommonModule,
    AllTeachersRoutingModule,
    FontAwesomeModule,
    DashboardModule,
    DataTablesModule
  ]
})
export class AllTeachersModule { }
