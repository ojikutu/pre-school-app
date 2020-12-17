import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllStudentsRoutingModule } from './all-students-routing.module';
import { AllStudentsComponent } from './all-students.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DashboardModule} from '../../dashboard.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';


@NgModule({
  declarations: [AllStudentsComponent],
  imports: [
    CommonModule,
    AllStudentsRoutingModule,
    FontAwesomeModule,
    DashboardModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class AllStudentsModule { }
