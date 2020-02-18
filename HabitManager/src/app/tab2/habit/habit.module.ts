import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import {TabsPageRoutingModule} from '../../tabs/tabs-routing.module';
import { HabitComponent } from './habit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule
  ],
  exports:[HabitComponent],
  declarations: [HabitComponent]
})
export class HabitPageModule {
  
}
