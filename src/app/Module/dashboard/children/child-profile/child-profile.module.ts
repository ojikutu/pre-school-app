import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildProfileRoutingModule } from './child-profile-routing.module';
import { ChildProfileComponent } from './child-profile.component';


@NgModule({
  declarations: [ChildProfileComponent],
  imports: [
    CommonModule,
    ChildProfileRoutingModule
  ]
})
export class ChildProfileModule { }
