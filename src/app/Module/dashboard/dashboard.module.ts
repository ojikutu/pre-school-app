import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CreateSchoolComponent } from './school/create-school/create-school.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { ContentLoaderComponent} from '../../Core/shared/component/content-loader/content-loader.component';
import { CreateClassComponent } from './class/create-class/create-class.component';
import { AllClassComponent } from './class/all-class/all-class.component';
import {PageTitleModule} from '../../Layout/Components/page-title/page-title.module';
import {DataTablesModule} from 'angular-datatables';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import { CreateTeacherComponent } from './teacher/create-teacher/create-teacher.component';
import { UploadStudentComponent } from './student/upload-student/upload-student.component';


@NgModule({
  declarations: [CreateSchoolComponent, ContentLoaderComponent, CreateClassComponent, AllClassComponent, CreateTeacherComponent, UploadStudentComponent],
    exports: [
        CreateSchoolComponent,
        ContentLoaderComponent,
        CreateClassComponent,
        CreateTeacherComponent,
        UploadStudentComponent
    ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    PageTitleModule,
    DataTablesModule,
    FontAwesomeModule,
    NgbTooltipModule
  ]
})
export class DashboardModule { }
