import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FunctionalityListComponent } from './functionality-list/functionality-list.component';
import { TaskKanbanComponent } from './task-kanban/task-kanban.component';

const routes: Routes = [
  { path: '', redirectTo: '/functionalities', pathMatch: 'full' },
  { path: 'functionalities', component: FunctionalityListComponent },
  { path: 'kanban/:functionalityId', component: TaskKanbanComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

