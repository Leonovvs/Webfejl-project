import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VasarlasRoutingModule } from './vasarlas-routing.module';
import {VasarlasComponent} from "./vasarlas.component";


@NgModule({
  declarations: [VasarlasComponent],
  imports: [
    CommonModule,
    VasarlasRoutingModule
  ]
})
export class VasarlasModule { }
