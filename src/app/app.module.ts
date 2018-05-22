import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import {
  FullLayoutComponent,
  InvalidPageComponent
} from './containers';

const APP_CONTAINERS = [
  FullLayoutComponent,
  InvalidPageComponent
];

import {
  AppSidebarModule,
  AppHeaderModule,
} from '@coreui/angular'

// Import routing module
import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './views/login/login.component';

import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { userBackendProvider } from './data/user-backend';

import {UserService} from './service/user.service';
import { RoleGuardService } from './interceptor/role-guard';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    LoginComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    UserService,
    userBackendProvider,
    MockBackend,
    BaseRequestOptions,
    RoleGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
