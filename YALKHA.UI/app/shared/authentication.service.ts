import { HttpClient, HttpRequest, HttpHeaders } from "@angular/common/http";
import { Injectable, Output, EventEmitter } from "@angular/core";
import { environment } from "../../environments/environment";

import { GlobalVariableService } from "./global-variable.service";
import { throwError as observableThrowError, Observable, of } from 'rxjs';
import { tap, catchError } from "rxjs/operators";
import { Constants } from "./constants";

@Injectable()
export class AuthenticationService {
    //private tokenKey: string = "token";
    private tokenUrl: string = "User/CreateToken";
    @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

    private cachedRequests: Array<HttpRequest<any>> = [];
    constructor(
        private _http: HttpClient,
        private globalVar: GlobalVariableService
    ) { }
    public generateToken(username: string, password: string): Observable<string> {
        const userDetail: any = {
            UserID: username,
            Password: password,
            RememberMe: true
        };
        return this._http
            .post<string>(environment.apiBaseURL + this.tokenUrl, userDetail)
            .pipe(
                tap((data: any) => {
                    if (data != undefined) {
                        if (data.IsSuccessful == true) {
                            //localStorage.setItem('currentUser', JSON.stringify(token));
                            localStorage.setItem(Constants.TokenValidityKey, JSON.stringify(data.Entity));
                            this.globalVar.setAthentication(data.Entity, true);
                            this.getLoggedInName.emit(username);
                            return data.Entity;
                        }
                        else if (data.IsValid == false) {
                            this.globalVar.setAthentication(null, false);
                            return data.Entity;
                        }
                    }
                }), catchError((error: any) => observableThrowError(error)));
    }

    public refreshToken(): Observable<string> {
        let token = localStorage.getItem(Constants.RefreshTokenKey);
        const userDetail: any = `grant_type=refresh_token&refresh_token=${token}`;
        return this._http
            .post<string>(environment.apiBaseURL + this.tokenUrl, userDetail)
            .pipe(
                tap((token: any) => {
                    localStorage.setItem(Constants.TokenValidityKey, token.access_token);
                    localStorage.setItem(Constants.RefreshTokenKey, token.refresh_token);
                    return token.access_token;
                }), catchError((error: any) => observableThrowError(error)));
    }

    public collectFailedRequest(request): void {
        this.cachedRequests.push(request);
    }

    public retryFailedRequests(): void {
        // retry the requests. this method can
        // be called after the token is refreshed
    }
}