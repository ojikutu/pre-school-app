import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateStudentRoutingModule } from './create-student-routing.module';
import { CreateStudentComponent } from './create-student.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DashboardModule} from '../../dashboard.module';


@NgModule({
  declarations: [CreateStudentComponent],
  imports: [
    CommonModule,
    CreateStudentRoutingModule,
    FontAwesomeModule,
    DashboardModule
  ]
})
export class CreateStudentModule { }
