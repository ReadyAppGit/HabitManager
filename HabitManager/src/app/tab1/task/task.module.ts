import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {TaskComponent} from './task.component';

import {TabsPageRoutingModule} from '../../tabs/tabs-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule
  ],
  exports:[TaskComponent],
  declarations: [TaskComponent]
})
export class taskPageModule {
  
}
