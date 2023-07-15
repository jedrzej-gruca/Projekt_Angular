import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FunctionalityListComponent } from './functionality-list/functionality-list.component';
import { TaskKanbanComponent } from './task-kanban/task-kanban.component';
import {AuthGuard} from "./services/auth.guard";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  // { path: '',
    // redirectTo: '/functionalities',
    // pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'functionalities', component: FunctionalityListComponent, canActivate: [AuthGuard] },
  { path: 'kanban/:functionalityId', component: TaskKanbanComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

