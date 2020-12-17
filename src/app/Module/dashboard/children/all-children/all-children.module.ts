import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllChildrenRoutingModule } from './all-children-routing.module';
import { AllChildrenComponent } from './all-children.component';
import {PageTitleModule} from '../../../../Layout/Components/page-title/page-title.module';
import {DashboardModule} from '../../dashboard.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [AllChildrenComponent],
    imports: [
        CommonModule,
        AllChildrenRoutingModule,
        PageTitleModule,
        DashboardModule,
        FontAwesomeModule
    ]
})
export class AllChildrenModule { }
