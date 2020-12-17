import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherProfileRoutingModule } from './teacher-profile-routing.module';
import { TeacherProfileComponent } from './teacher-profile.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [TeacherProfileComponent],
    imports: [
        CommonModule,
        TeacherProfileRoutingModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        NgbTooltipModule
    ]
})
export class TeacherProfileModule { }
