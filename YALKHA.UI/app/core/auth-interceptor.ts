import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpSentEvent,
    HttpHeaderResponse,
    HttpProgressEvent,
    HttpResponse,
    HttpUserEvent,
    HttpEvent,
    HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Constants } from "../shared/constants";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { GlobalVariableService } from "../shared/global-variable.service";

//const loginUrl = "/token";
const loginUrl = "User/CreateToken";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router, private globalVar: GlobalVariableService) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<
        | HttpSentEvent
        | HttpHeaderResponse
        | HttpProgressEvent
        | HttpResponse<any>
        | HttpUserEvent<any>
    > {
        if (req.url.indexOf(loginUrl) > -1) {
            return next.handle(req);
        }

        const authToken = JSON.parse(localStorage.getItem(Constants.TokenValidityKey));

        let authReq = req.clone({
            headers: req.headers.set("Authorization", `Bearer ${authToken.Token}`).set("Content-Type", "application/json")
        });

        return next.handle(authReq).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // if the token is valid
            }
        }, (err: any) => {
            // if the token has expired.
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    // this is where you can do anything like navigating
                    localStorage.removeItem(Constants.TokenValidityKey);
                    this.globalVar.setAthentication(null, false);
                    //this.router.navigate(["login"]);
                    this.router.navigateByUrl('/login');
                }
            }
        }));
    }
}
