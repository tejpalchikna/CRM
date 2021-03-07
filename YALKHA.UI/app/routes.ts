import { Routes, RouterModule } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './shared/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { RolesComponent } from './account/roles/roles.component';
import { PageNotFoundComponent } from '../app/shared/page-not-found/page-not-found.component';
import { LoginErrorComponent } from '../app/shared/login-error/login-error.component';
import { ErrorComponent } from '../app/shared/error/error.component';
import { Constants } from '../app/shared/constants';
import { NgModule } from '@angular/core';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';
import { UsersComponent } from './account/users/users.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { SendBulkEmailsComponent } from './pages/sendbulkemails/sendbulkemails.component';

export const appRoutes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { permissions: ['DASHBOARD'] } },
    { path: 'roles/index', component: RolesComponent, canActivate: [AuthGuard], data: { permissions: ['MANAGEROLE'] } },
    { path: 'home/changepassword', component: RolesComponent, canActivate: [AuthGuard], data: { permissions: ['CHANGEPASSWORD'] } },
    { path: 'menu/index', component: RolesComponent, canActivate: [AuthGuard], data: { permissions: ['MENUEDITOR'] } },
    { path: 'roles/rights', component: RolesComponent, canActivate: [AuthGuard], data: { permissions: ['MANAGERIGHTS'] } },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { permissions: ['MANAGEUSER'] } },
    { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard], data: { permissions: ['CONTACTS'] } },
    { path: 'contacts/index', component: ContactsComponent, canActivate: [AuthGuard], data: { permissions: ['MANAGECONTACTS'] } },
    { path: 'sendbulkemail', component: SendBulkEmailsComponent, canActivate: [AuthGuard], data: { permissions: ['BULKEMAILS'] } },
    { path: 'sendbulkemail/index', component: SendBulkEmailsComponent, canActivate: [AuthGuard], data: { permissions: ['SENDBULKEMAILS'] } },
    { path: 'login', component: LoginComponent },
    { path: 'error', component: ErrorComponent, canActivate: [AuthGuard] },
    { path: 'login-error', component: LoginErrorComponent, canActivate: [AuthGuard] },
    { path: 'unauthorized', component: UnauthorizedComponent, canActivate: [AuthGuard] },
    { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }