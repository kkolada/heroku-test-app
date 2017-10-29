import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BestEmployeesWidget } from './components/best-employees-widget/best-employees-widget';
import { UserListComponent } from './components/user-list/user-list.component';

import { UserService } from './services/user.service';
import { AddUserComponent } from './components/add-user/add-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { StorageService } from './services/storage.service';
import { StarRatingComponent } from './shared/star-rating/star-rating.component';


const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'add-user',
    component: AddUserComponent
  },
  {
    path: 'user-list',
    component: UserListComponent
  },
  {
    path: 'app-edit-user/:userId',
    component: EditUserComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BestEmployeesWidget,
    UserListComponent,
    AddUserComponent,
    DashboardComponent,
    EditUserComponent,
    StarRatingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
