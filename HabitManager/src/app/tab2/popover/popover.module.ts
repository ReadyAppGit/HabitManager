import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { PopoverPage } from './popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ], 
  exports:[PopoverPage],
  declarations: [PopoverPage]
})
export class PopoverPageModule {}
