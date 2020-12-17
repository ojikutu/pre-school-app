import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllSchoolsRoutingModule } from './all-schools-routing.module';
import { AllSchoolsComponent } from './all-schools.component';
import {PageTitleModule} from '../../../../Layout/Components/page-title/page-title.module';
import {DashboardModule} from '../../dashboard.module';
import {DataTablesModule} from 'angular-datatables';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AllSchoolsComponent],
    imports: [
        CommonModule,
        AllSchoolsRoutingModule,
        PageTitleModule,
        DashboardModule,
        DataTablesModule,
        FontAwesomeModule,
        NgbTooltipModule
    ]
})
export class AllSchoolsModule { }
