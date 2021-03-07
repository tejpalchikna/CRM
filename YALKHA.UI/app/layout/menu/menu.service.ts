import { throwError as observableThrowError, Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";

@Injectable()
export class MenuService {
    private pageUrl = environment.apiBaseURL + 'User/GetMenuForBind';

    constructor(private http: HttpClient) { }

    GetMenuForBind(): Observable<string> {
        const url = this.pageUrl;
        return this.http.get(url).pipe(map((response: any) => {
            if (response) {
                return response.Entity;
            }
        }), catchError((error: any) => observableThrowError(error)));
    }
}