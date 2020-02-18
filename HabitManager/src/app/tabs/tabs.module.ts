import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { Tab1Page } from '../tab1/tab1.page';
import { NewTaskPage } from '../tab1/new-task/new-task.page';
import { taskPageModule } from '../tab1/task/task.module';
import { EditTaskPage } from '../tab1/edit-task/edit-task.page';
import { Tab2Page } from '../tab2/tab2.page';
import { HabitPageModule } from '../tab2/habit/habit.module';
import { NewHabitPage } from '../tab2/new-habit/new-habit.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    taskPageModule,
    HabitPageModule
    // SuperTabsModule
  ],
  declarations: [TabsPage,Tab1Page,NewTaskPage,EditTaskPage,Tab2Page,NewHabitPage]
})
export class TabsPageModule {}
