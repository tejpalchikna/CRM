import { throwError as observableThrowError, Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { SendBulkEmailModel } from './sendbulkemails.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CollectionResult } from '../../shared/collection-result';
import { environment } from "../../../environments/environment";
//import { isNullOrUndefined } from 'util';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SendBulkEmailsService {
    private sendbulkemailPageUrl = environment.apiBaseURL + 'SendBulkEmail';

    constructor(private http: HttpClient) { }

    createOrEditSendBulkEmail(newSendBulkEmail: SendBulkEmailModel): Observable<SendBulkEmailModel> {
        var createdSendBulkEmail = new SendBulkEmailModel();
        var createSendBulkEmailDto = newSendBulkEmail.mapToDto();
        const url = `${this.sendbulkemailPageUrl}/SendMail/`;
        return this.http.post(url, createSendBulkEmailDto)
            .pipe(
                tap((sendbulkemailDto: any) => {
                    createdSendBulkEmail = SendBulkEmailModel.mapFromDto(sendbulkemailDto)
                }),
                catchError((error: any) => observableThrowError(error))
            );
    }

    GetSendBulkEmails(searchTerm?: string, pageNo?: number, pageSize?: number): Observable<SendBulkEmailModel[]> {
        pageNo = 1;
        pageSize = 10;
        if (searchTerm == "" || searchTerm == undefined) {//isNullOrUndefined
            searchTerm = "";
        }
        const url = `${this.sendbulkemailPageUrl}/Get?searchTerm=${searchTerm}&pageNo=${pageNo}&pageSize=${pageSize}`;
        return this.http.get(url).pipe(map((response: CollectionResult) => {
            if (response && response.items) {
                var sendbulkemails: SendBulkEmailModel[] = [];

                for (let sendbulkemailDto of response.items) {
                    var sendbulkemailModel = SendBulkEmailModel.mapFromDto(sendbulkemailDto);
                    sendbulkemails.push(sendbulkemailModel);
                }
                return sendbulkemails;
            }
        }), catchError((error: any) => observableThrowError(error)));
    }
}