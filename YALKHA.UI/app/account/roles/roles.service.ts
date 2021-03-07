import { throwError as observableThrowError, Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { RoleModel } from './roles.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CollectionResult } from '../../shared/collection-result';
import { environment } from "../../../environments/environment";
//import { isNullOrUndefined } from 'util';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RolesService {
    private rolePageUrl = environment.apiBaseURL + 'Roles';

    constructor(private http: HttpClient) { }

    //getDashboardAssetCounts(status?: string, fromDateUtcString?: string, endDateUtcString?: string): Observable<DashboardAssetCount> {
    //    var url = this.pageUrl + `/AssetCounts?status=${status}&fromDateUtcString=${fromDateUtcString}&endDateUtcString=${endDateUtcString}`;
    //    return this.http.get(url).pipe(map((res: any) => {
    //        if (res) {
    //            var dashboardAsset = new DashboardAssetCount();
    //            dashboardAsset = dashboardAsset.mapFromDto(res);
    //            return dashboardAsset;
    //        }
    //        return null;
    //    }));
    //}

    createOrEditRole(newRole: RoleModel): Observable<RoleModel> {
        var createdRole = new RoleModel();
        var createRoleDto = newRole.mapToDto();
        const url = `${this.rolePageUrl}/Post/`;
        return this.http.post(url, createRoleDto)
            .pipe(
                tap((roleDto: any) => {
                createdRole =RoleModel.mapFromDto(roleDto)
                }),
                catchError((error: any) => observableThrowError(error))
            );
    }

    GetRoles(searchTerm?: string, pageNo?: number, pageSize?: number): Observable<RoleModel[]> {
        if (searchTerm == "" || searchTerm == undefined) {//isNullOrUndefined
             searchTerm = "";
        }
        const url = `${this.rolePageUrl}/Get?searchTerm=${searchTerm}&pageNo=${pageNo}&pageSize=${pageSize}`;
        return this.http.get(url).pipe(map((response: CollectionResult) => {
            if (response && response.items) {
                var roles: RoleModel[] = [];

                for (let roleDto of response.items) {
                    var roleModel = RoleModel.mapFromDto(roleDto);
                    roles.push(roleModel);
                }
                return roles;
            }
        }), catchError((error: any) => observableThrowError(error)));
    }
}