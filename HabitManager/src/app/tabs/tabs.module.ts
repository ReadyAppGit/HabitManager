import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { Tab1Page } from '../tab1/tab1.page';
import { NewTaskPage } from '../tab1/new-task/new-task.page';
import { taskPageModule } from '../tab1/task/task.module';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { EditTaskPageModule } from '../tab1/edit-task/edit-task.module';
import { EditTaskPage } from '../tab1/edit-task/edit-task.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    taskPageModule,
    // SuperTabsModule
  ],
  declarations: [TabsPage,Tab1Page,NewTaskPage,EditTaskPage]
})
export class TabsPageModule {}
