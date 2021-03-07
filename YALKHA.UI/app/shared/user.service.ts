import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/operators';
import { User } from './user.model';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    registerUser(user: User) {
        const body: User = {
            UserID: user.UserID,
            Password: user.Password,
            Email: user.Email,
            FirstName: user.FirstName,
            LastName: user.LastName,
            RememberMe: user.RememberMe
        }
        var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
        return this.http.post(environment.apiBaseURL + 'api/User/Register', body, { headers: reqHeader });
    }

    //userAuthentication(userName, password) {
    //    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    //    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    //    return this.http.post(environment.apiBaseURL + '/token', data, { headers: reqHeader });
    //}

    getUserClaims() {
        return this.http.get(environment.apiBaseURL + 'api/GetUserClaims');
    }

}
