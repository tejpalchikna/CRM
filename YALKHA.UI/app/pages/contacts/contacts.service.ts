import { throwError as observableThrowError, Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ContactModel } from './contacts.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CollectionResult } from '../../shared/collection-result';
import { environment } from "../../../environments/environment";
//import { isNullOrUndefined } from 'util';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ContactsService {
    private contactPageUrl = environment.apiBaseURL + 'Contacts';

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

    createOrEditContact(newContact: ContactModel): Observable<ContactModel> {
        var createdContact = new ContactModel();
        var createContactDto = newContact.mapToDto();
        const url = `${this.contactPageUrl}/Post/`;
        return this.http.post(url, createContactDto)
            .pipe(
                tap((contactDto: any) => {
                    createdContact = ContactModel.mapFromDto(contactDto)
                }),
                catchError((error: any) => observableThrowError(error))
            );
    }

    GetContacts(searchTerm?: string, pageNo?: number, pageSize?: number): Observable<ContactModel[]> {
        if (searchTerm == "" || searchTerm == undefined) {//isNullOrUndefined
            searchTerm = "";
        }
        const url = `${this.contactPageUrl}/Get?searchTerm=${searchTerm}&pageNo=${pageNo}&pageSize=${pageSize}`;
        return this.http.get(url).pipe(map((response: CollectionResult) => {
            if (response && response.items) {
                var contacts: ContactModel[] = [];

                for (let contactDto of response.items) {
                    var contactModel = ContactModel.mapFromDto(contactDto);
                    contacts.push(contactModel);
                }
                return contacts;
            }
        }), catchError((error: any) => observableThrowError(error)));
    }
}