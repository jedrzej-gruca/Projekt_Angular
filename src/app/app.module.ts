import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FunctionalityListComponent } from './functionality-list/functionality-list.component';
import { TaskKanbanComponent } from './task-kanban/task-kanban.component';
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import {AuthGuard, provideAuthGuard} from './services/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    FunctionalityListComponent,
    TaskKanbanComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    {
      provide: 'AuthGuard',
      useFactory: provideAuthGuard,
      deps: [Injector]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
