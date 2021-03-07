import { Component, OnInit, Inject } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { GlobalVariableService } from '../../shared/global-variable.service';
import { global } from '@angular/compiler/src/util';
import { MenuService } from './menu.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../../shared/authentication.service';
import { Constants } from '../../shared/constants';

@Component({
    selector: 'app-menu',
    templateUrl: `./menu.component.html`,
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    public isLoggedIn: boolean = false;
    menuItem: string;
    isMenusLoaded: boolean = false;
    items: MenuItem[];
    userName: string;
    roleList: any;
    roleId: string;
    roleName: string;
    displayName: string;
    facilityName: string;
    constructor(private router: Router, private globalVar: GlobalVariableService, private menuService: MenuService,
        private messageService: MessageService, protected html_sanitizer: DomSanitizer, private authenticationService: AuthenticationService) {

        authenticationService.getLoggedInName.subscribe(name => this.changeName(name));
    }
    private changeName(name: string): void {
        this.userName = name;
    }
    sameAsHtml(html_content) {
        return this.html_sanitizer.bypassSecurityTrustHtml(html_content);
    }
    ngOnInit() {
        this.globalVar.isUserLoggedIn.subscribe(isLogged => {
            this.isLoggedIn = isLogged;
            if (this.isLoggedIn) {
                this.GetMenus();
            }
        });
    }

    //menuItem
    GetMenus(): void {
        this.menuService.GetMenuForBind().subscribe
            (
                menus => {
                    this.menuItem = menus;
                    this.isMenusLoaded = true;
                    this.roleList = this.globalVar.roleList;
                    this.roleId = this.globalVar.currentRoleId;
                    this.roleName = this.globalVar.currentRoleName;
                    this.displayName = this.globalVar.displayName;
                    this.facilityName = this.globalVar.facilityName;
                }
                , (error) => {
                    this.handleError(error);
                });
    }


    public Logout() {
        this.isLoggedIn = false;
        localStorage.removeItem(Constants.TokenValidityKey);
        this.globalVar.setAthentication(null, false);
        this.router.navigate(["login"]);
    }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            this.messageService.add({ severity: 'warn', summary: 'An error occurred', detail: 'error.error.message' });
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            this.messageService.add({ severity: 'warn', summary: errorResponse.statusText, detail: errorResponse.status == 403 ? "User is unauthorized to perform this action." : errorResponse.error });
        }
    }
}
