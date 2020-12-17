import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolDetailsRoutingModule } from './school-details-routing.module';
import { SchoolDetailsComponent } from './school-details.component';
import {PageTitleModule} from '../../../../Layout/Components/page-title/page-title.module';
import {DashboardModule} from '../../dashboard.module';
import {NgBootstrapFormValidationModule} from 'ng-bootstrap-form-validation';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [SchoolDetailsComponent],
  imports: [
    CommonModule,
    SchoolDetailsRoutingModule,
    PageTitleModule,
    DashboardModule,
    NgBootstrapFormValidationModule,
    ReactiveFormsModule
  ]
})
export class SchoolDetailsModule { }
