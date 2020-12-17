import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolEditRoutingModule } from './school-edit-routing.module';
import { SchoolEditComponent } from './school-edit.component';


@NgModule({
  declarations: [SchoolEditComponent],
  exports: [
    SchoolEditComponent
  ],
  imports: [
    CommonModule,
    SchoolEditRoutingModule
  ]
})
export class SchoolEditModule { }
