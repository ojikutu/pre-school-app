import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProfileRoutingModule } from './edit-profile-routing.module';
import { EditProfileComponent } from './edit-profile.component';
import {PageTitleModule} from '../../../../Layout/Components/page-title/page-title.module';
import {DashboardModule} from '../../dashboard.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [EditProfileComponent],
    imports: [
        CommonModule,
        EditProfileRoutingModule,
        PageTitleModule,
        DashboardModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        NgbDatepickerModule
    ]
})
export class EditProfileModule { }
