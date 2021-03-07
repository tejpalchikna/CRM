import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from "@angular/router";


//import { User } from "../../shared/user.model";
import { GlobalVariableService } from "../../shared/global-variable.service";
import { AuthenticationService } from "../../shared/authentication.service";
import { LoginModel } from './login.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    isLoginError: boolean = false;
    private returnUrl: string;
    public errorMsg: string;
    public hide: boolean;
    public token: boolean;
    public status: boolean;
    public message: boolean;
    userName: string = '';
    password: string = '';
    @ViewChild('user', { static: false }) uservc: ElementRef;
    @ViewChild('pass', { static: false }) passvc: ElementRef;
    constructor(private router: Router,
        private route: ActivatedRoute,
        private globalVar: GlobalVariableService,
                //private userService: UserService,
        private authService: AuthenticationService, private messageService: MessageService) {
        if (this.globalVar.isAuthenticated) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        let url = this.route.snapshot.queryParams["returnUrl"];
        if (url) this.returnUrl = url;
        else this.returnUrl = "/";
    }
    focusPass() {
        this.passvc.nativeElement.focus();
    }
    OnSubmit() {
        this.authService.generateToken(this.userName, this.password).subscribe(
            result => {
                var data = new LoginModel();
                data.mapFromDto(result)
                if (data.IsSuccessful == true) {
                    this.router.navigate([this.returnUrl]);
                }
                else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Login Failed:' + data.Message });
                }
                //localStorage.setItem('userToken', data.access_token);

            },
            (err: HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Login <strong>Failed</strong> ' });
                this.isLoginError = true;
            });
    }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            this.messageService.add({ severity: 'error', summary: 'An error occurred', detail: 'error.error.message' });
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            this.messageService.add({ severity: 'error', summary: errorResponse.statusText, detail: errorResponse.status == 403 ? "User is unauthorized to perform this action." : errorResponse.error });
        }
    }
}
