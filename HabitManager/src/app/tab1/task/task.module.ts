import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {TaskComponent} from './task.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports:[TaskComponent],
  declarations: [TaskComponent]
})
export class taskPageModule {
  
}
