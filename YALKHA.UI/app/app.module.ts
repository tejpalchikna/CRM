import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ComponentFactoryResolver, ApplicationRef, ComponentFactory } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, UrlSerializer, PreloadAllModules } from '@angular/router'
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OverlayContainer } from "@angular/cdk/overlay";
import { LoginComponent } from './shared/login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { appRoutes } from './routes';
import { AuthGuard } from './auth/auth.guard';
import { APP_BASE_HREF } from '@angular/common';
import { MenuComponent } from './layout/menu/menu.component';
import { DashboardService } from './dashboard/dashboard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GlobalVariableService } from "./shared/global-variable.service";
import { AuthenticationService } from "./shared/authentication.service";
import { httpInterceptorProviders } from "./core/interceptor.provider";
import { RolesComponent } from './account/roles/roles.component';
import { ManageRolesComponent } from './account/roles/manage-roles/manage-roles.component';
import { RolesService } from './account/roles/roles.service';
import { LoginErrorComponent } from './shared/login-error/login-error.component';
import { ErrorComponent } from './shared/error/error.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AuthInterceptor } from './core/auth-interceptor';
//PrimeNG
import { MessagesModule } from 'primeng/messages';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { EditorModule } from 'primeng/editor';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MenubarModule } from 'primeng/menubar';

import { ContactsService } from './pages/contacts/contacts.service';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ManageContactsComponent } from './pages/contacts/manage-contacts/manage-contacts.component';

import { SendBulkEmailsService } from './pages/sendbulkemails/sendbulkemails.service';
import { SendBulkEmailsComponent } from './pages/sendbulkemails/sendbulkemails.component';
import { ManageSendBulkEmailsComponent } from './pages/sendbulkemails/manage-sendbulkemails/manage-sendbulkemails.component';
import { MenuService } from './layout/menu/menu.service';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';
import { LowerCaseUrlSerializer } from './helper/lowercaseurlserializer';
import { HelperMethods } from './core/helper-methods';
import { UserService } from './account/users/users.service';
import { UsersComponent } from './account/users/users.component';
import { ManageUsersComponent } from './account/users/manage-users/manage-users.component';

@NgModule({
    declarations: [
        AppComponent,
        MessagesComponent,
        MenuComponent,
        RolesComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        UsersComponent,
        ManageUsersComponent,
        DashboardComponent,
        ManageRolesComponent,
        LoginErrorComponent,
        ErrorComponent,
        PageNotFoundComponent,
        UnauthorizedComponent,
        // SidebarComponent //todo
        ContactsComponent,
        ManageContactsComponent,
        SendBulkEmailsComponent,
        ManageSendBulkEmailsComponent
    ],
    imports: [
        NgProgressModule,
        NgProgressHttpModule,
        BrowserModule,
        FormsModule,
        MenubarModule,
        MessagesModule,
        MessageModule,
        HttpClientModule,
        BrowserAnimationsModule,
        //RouterModule.forRoot(appRoutes),
        [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
        DropdownModule,
        EditorModule,
        ScrollingModule,
        TableModule,
        DialogModule,
        CheckboxModule,
        ToastModule,
        AutoCompleteModule,
        ScrollingModule
    ],
    providers: [
        AuthGuard,
        UserService,
        MessageService,
        GlobalVariableService,
        AuthenticationService,
        DashboardService,
        RolesService,
        MenuService,
        HelperMethods,
        ContactsService,
        SendBulkEmailsService,

        httpInterceptorProviders,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: UrlSerializer,
            useClass: LowerCaseUrlSerializer
        },
        [AuthGuard, {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }]
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        private _resolver: ComponentFactoryResolver,
        private overlayContainer: OverlayContainer
    ) { }

    ngDoBootstrap(appRef: ApplicationRef) {
        const factory: ComponentFactory<
            AppComponent
        > = this._resolver.resolveComponentFactory(AppComponent);
        appRef.bootstrap(factory);
    }
}

