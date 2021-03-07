import { throwError as observableThrowError, Observable, of } from 'rxjs';
import { map, catchError, tap, debounce } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UserModel } from './users.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CollectionResult } from '../../shared/collection-result';
import { environment } from "../../../environments/environment";
import { SelectItemModel } from '../../shared/select-item.model';
import { RoleModel } from '../roles/roles.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
    private userPageUrl = environment.apiBaseURL + 'Users';
    private commonPageUrl = environment.apiBaseURL + 'Common';
    private rolesPageUrl = environment.apiBaseURL + 'Roles';

    constructor(private http: HttpClient) { }

    createOrUpdateUser(newUser: UserModel): Observable<UserModel> {
        var createdUser = new UserModel();
        var createUserDto = newUser.mapToDto();
        const url = `${this.userPageUrl}/CreateOrUpdateUser/`;
        return this.http.post(url, createUserDto)
            .pipe(
                tap((userDto: any) => {
                var createdUser = UserModel.mapFromDto(userDto)
                }),
                catchError((error: any) => observableThrowError(error))
            );
    }

    GetRoles(searchTerm: string): Observable<RoleModel[]> {
        searchTerm = searchTerm || "";
        const url = `${this.commonPageUrl}/GetRoles?searchTerm=${searchTerm}`;
        return this.http.get(url).pipe(map((res: CollectionResult) => {
            if (res && res.items) {
                var roles: RoleModel[]=[];
                for (let item of res.items) {
                    var role = RoleModel.mapFromDto(item);
                    console.log('role',role);
                    roles.push(role);
                }
                return roles;
            }
        }));
    }

    GetFacilities(term?: string): Observable<CollectionResult> {
        term = term || "";
        const url = `${this.commonPageUrl}/GetFacilities/?searchTerm=${term}`;
        return this.http.get(url).pipe(map((res: CollectionResult) => {
            if (res && res.items) {
                var facilities: CollectionResult = { totalCount: res.totalCount, items: [] };
                for (let facility of res.items) {
                    facilities.items.push(facility);
                }
                return facilities;

            }
        }));
    }

    GetUsers(searchTerm?: string, pageNo?: number, pageSize?: number): Observable<CollectionResult> {
        if (searchTerm == "" || searchTerm == undefined) {//isNullOrUndefined
            searchTerm = "";
        }
        const url = `${this.userPageUrl}/Get?searchTerm=${searchTerm}&pageNo=${pageNo}&pageSize=${pageSize}`;
        return this.http.get(url).pipe(map((response: CollectionResult) => {
            if (response && response.items) {
                var users: CollectionResult = { totalCount: response.totalCount, items: [] };
                for (let userDto of response.items) {
                    var userModel = UserModel.mapFromDto(userDto);
                    users.items.push(userModel);
                }
                return users;
            }
        }), catchError((error: any) => observableThrowError(error)));
    }

    //searchRoles(orderStatus?: string, fromDueDateUtcString?: string, endDueDateUtcString?: string, term?: string, pageNo?: number, pageSize?: number): Observable<CollectionResult> {
    //    orderStatus = orderStatus || "";
    //    var url = `${this.pageUrl}/Get/?orderStatus=${orderStatus}&fromDueDateUtcString=${fromDueDateUtcString}&endDueDateUtcString=${endDueDateUtcString}&searchTerm=${term}&pageNo=${pageNo}&pageSize=${pageSize}`;
    //    return this.http.get(url).pipe(map((res: CollectionResult) => {
    //        if (res && res.items) {
    //            var collectionResult: CollectionResult = { totalCount: res.totalCount, items: [] };
    //            for (let orderDto of res.items) {
    //                var order = Order.FromOrderDto(orderDto);
    //                collectionResult.items.push(order);
    //            }
    //            return collectionResult;
    //        }
    //    }), catchError((error: any) => observableThrowError(error)));
    //}


}