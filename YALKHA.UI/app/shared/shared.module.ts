//import { BrowserModule } from '@angular/platform-browser';
//import { NgModule } from '@angular/core';
//import { FormsModule } from '@angular/forms';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { RouterModule } from '@angular/router'
//import { HashLocationStrategy, LocationStrategy } from '@angular/common';

//import { NgProgressModule } from '@ngx-progressbar/core';
//import { NgProgressHttpModule } from '@ngx-progressbar/http';

//import { AppComponent } from './app.component';
//import { UserService } from './shared/user.service';
//import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { ToastrModule } from 'ngx-toastr';
//import { UserComponent } from './user/user.component';
//import { SignInComponent } from './user/sign-in/sign-in.component';
//import { HomeComponent } from './home/home.component';
//import { HeaderComponent } from './layout/header/header.component';
//import { FooterComponent } from './layout/footer/footer.component';
//import { appRoutes } from './routes';
//import { AuthGuard } from './auth/auth.guard';
//import { AuthInterceptor } from './auth/auth.interceptor';
//import { APP_BASE_HREF } from '@angular/common';
//import { MenuComponent } from './layout/menu/menu.component';
//import { MenubarModule } from 'primeng/menubar';
//import { MessagesModule } from 'primeng/messages';
//import { MessageModule } from 'primeng/message';

//@NgModule({
//    declarations: [
//        AppComponent,
//        MenuComponent,
//        UserComponent,
//        SignInComponent,
//        HomeComponent,
//        HeaderComponent,
//        FooterComponent,
//    ],
//    imports: [
//        BrowserModule,
//        FormsModule,
//        MenubarModule,
//        MessagesModule,
//        MessageModule,
//        HttpClientModule,
//        ToastrModule.forRoot(),
//        BrowserAnimationsModule,
//        RouterModule.forRoot(appRoutes)
//    ],
//    providers: [UserService, AuthGuard,
//        {
//            provide: HTTP_INTERCEPTORS,
//            useClass: AuthInterceptor,
//            multi: true
//        },
//        [AuthGuard, {
//            provide: LocationStrategy,
//            useClass: HashLocationStrategy
//        }],
//        {
//            provide: APP_BASE_HREF, useValue: '/'
//        }],
//    bootstrap: [AppComponent]
//})
//export class AppModule { }
