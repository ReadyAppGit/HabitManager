import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { Tab1Page } from '../tab1/tab1.page';
import { NewTaskPage } from '../tab1/new-task/new-task.page';
import { EditTaskPage } from '../tab1/edit-task/edit-task.page';

import { Tab2Page } from '../tab2/tab2.page';
import { NewHabitPage } from '../tab2/new-habit/new-habit.page';


import {NewRoutinePage} from '../tab3/new-routine/new-routine.page';
import { EditHabitPage } from '../tab2/edit-habit/edit-habit.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            component: Tab1Page
          },
          {
            path: 'new-task',
            component: NewTaskPage
          },
          {
            path: 'edit-task',
            component: EditTaskPage
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            component: Tab2Page
          },
          {
            path: 'new-habit',
            component: NewHabitPage
          },
          {
            path: 'edit-habit',
            component: EditHabitPage
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: 'new-routine',
            component: NewRoutinePage
          },
          {
            path: '',
            loadChildren: () =>
              import('../tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
