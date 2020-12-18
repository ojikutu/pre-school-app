import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import {PageTitleModule} from '../../../Layout/Components/page-title/page-title.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SchoolEditModule} from '../school/school-edit/school-edit.module';
import {DashboardModule} from '../dashboard.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgBootstrapFormValidationModule} from 'ng-bootstrap-form-validation';


@NgModule({
  declarations: [LandingComponent],
    imports: [
        CommonModule,
        LandingRoutingModule,
        PageTitleModule,
        FontAwesomeModule,
        SchoolEditModule,
        DashboardModule,
        ReactiveFormsModule,
      NgBootstrapFormValidationModule
    ]
})
export class LandingModule { }
