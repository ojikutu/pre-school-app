import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentProfileRoutingModule } from './student-profile-routing.module';
import { StudentProfileComponent } from './student-profile.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgBootstrapFormValidationModule} from 'ng-bootstrap-form-validation';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [StudentProfileComponent],
  imports: [
    CommonModule,
    StudentProfileRoutingModule,
    FontAwesomeModule,
    NgBootstrapFormValidationModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    FormsModule
  ]
})
export class StudentProfileModule { }
