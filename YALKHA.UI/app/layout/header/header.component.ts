import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    isWMSMode: boolean = true;
    showNavbarContent = false; //- on Start set this to hide
    displayName: string;
    printerType: string = "";
    allowCancel: boolean = false;

    constructor(private router: Router) {//, private messageService: MessageService
    }


    ngOnInit() //- this binds the included variables to the frontend
    {
        //this.authorizationService.getLoggedInUserInfo().subscribe(user => {
        //    if (user && user.isActive && user.displayName.length > 0) {
        //        this.loggedinUser = user;
        //        this.displayName = user.displayName;
        //        this.showNavbarContent = true; //- show the Navbar Content
        //        this.loadHeaderSettings();
        //    }
        //    else {
        //        this.showNavbarContent = false; //- hide the Navbar Content
        //    }
        //});
    }


    cancel() {
        this.allowCancel = false;
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            // this.messageService.add({ severity: 'warn', summary: 'An error occurred', detail: 'error.error.message' });
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // this.messageService.add({ severity: 'warn', summary: errorResponse.statusText, detail: errorResponse.status == 403 ? "User is unauthorized to perform this action." : errorResponse.error });
        }
    }
}
