import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Component
import { FullLayoutComponent, InvalidPageComponent } from './containers';
import { LoginComponent } from './views/login/login.component';
import { RoleGuardService } from './interceptor/role-guard';

export const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home Page'
    },
    children: [
      {
        path: 'home',
        canActivate: [RoleGuardService],
        loadChildren: './views/home/home.module#HomeModule',
        data: {
          role: [
            'home'
          ]
        }
      },
      {
        path: 'about',
        canActivate: [RoleGuardService],
        loadChildren: './views/about/about.module#AboutModule',
        data: {
          role: [
            'about'
          ]
        }
      },
      {
        path: 'user',
        canActivate: [RoleGuardService],
        loadChildren: './views/user/user.module#UserModule',
        data: {
          role: [
            'user'
          ]
        }
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'unauthorized',
    component: InvalidPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
