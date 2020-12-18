import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './Layout/base-layout/base-layout.component';
import { PagesLayoutComponent } from './Layout/pages-layout/pages-layout.component';

// // Pages
import {SignInComponent} from './Module/auth/sign-in/sign-in.component';
import {SignUpComponent} from './Module/auth/sign-up/sign-up.component';
import {ForgotComponent} from './Module/auth/forgot/forgot.component';
import {NotFoundComponent} from './Module/auth/not-found/not-found.component';
import {LandingComponent} from './Module/homepage/landing/landing.component';
import {AuthGuard} from './Core/guard/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  }, {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: 'app',
        loadChildren: () => import('./Module/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [
      // User Pages
      {
        path: 'auth/sign-in', component: SignInComponent, data: { extraParameter: '' }
      },
      {
        path: 'auth/sign-up', component: SignUpComponent, data: { extraParameter: '' }
      },
      {
        path: 'auth/forgot', component: ForgotComponent, data: { extraParameter: '' }
      }
    ]
  },
  { path: '**',   component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
