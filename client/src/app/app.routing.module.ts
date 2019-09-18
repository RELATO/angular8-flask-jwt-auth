import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogoutComponent } from './logout/logout.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AuthGuard } from './core/services/auth.guard';
import { LayoutComponent } from './layout/layout.component';

const appRoutes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./register-user/register-user.module').then(m => m.RegisterUserModule)
    },
    {
        path: 'main',
        component: LayoutComponent,
        children: [{
            path: 'dashboard',
            loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
            canActivate: [AuthGuard]
        },
        {
            path: 'departments',
            loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule),
            canActivate: [AuthGuard]
        },
        {
            path: 'employees',
            loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule),
            canActivate: [AuthGuard]
        },
        {
            path: 'aboutus',
            loadChildren: () => import('./aboutus/aboutus.module').then(m => m.AboutUsModule),
            canActivate: [AuthGuard]
        },
        {
            path: 'contactus',
            loadChildren: () => import('./contactus/contactus.module').then(m => m.ContactUsModule),
            canActivate: [AuthGuard]
        }]
    },
    {
      path: 'denied',
      component: AccessDeniedComponent
    },
    {
      path: 'logout',
      component: LogoutComponent,
      canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
