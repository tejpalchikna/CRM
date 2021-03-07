import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { MessageService, LazyLoadEvent } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ContactModel } from './contacts.model';
import { ContactsService } from './contacts.service';
import { Constants } from '../../shared/constants';
import { Table } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionableBooleanPipe } from '../../shared/pipes/questionable-boolean.pipe';
import { PipeExecutorPipe } from '../../shared/pipes/pipe-executor.pipe';


@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css'],
    //providers: [DialogService]

})
export class ContactsComponent implements OnInit {

    @ViewChild('contactsTable', { static: false }) primeNgTable: Table;
    cols: { field: string, header: string, pipe?: any, pipeParams?: string }[];
    pageSize: number = Constants.DefaultPageSize;
    defaultPageSizeOptions: number[] = Constants.DefaultPageSizeOptions;
    pageNo: number = 1;
    includeInactive: boolean = false;
    searchName: string;
    paramSearchName: string;

    editContactForm = false; //- on Start set this to hide

    totalRecords: number;
    //- this gets the export Contact class from the contact.model.ts
    contacts: ContactModel[]; //- multiple contacts possible
    contact: ContactModel; //- only one contact
    //permissions: PermissionModel[]; //- multiple Permissions possible
    editCreateIsVisible: boolean;
    deleteIsVisible: boolean;
    csvFileName: string;

    constructor(
        private injector: Injector,
        private contactService: ContactsService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }


    ngOnInit() {
        this.totalRecords = 0;

        this.cols = [
            { field: 'ContactName', header: 'Contact Name' },
            { field: 'ContactType', header: 'Contact Type' },
            { field: 'Active', header: 'Active', pipe: QuestionableBooleanPipe},
            { field: 'CreatedBy', header: 'Created By' }
        ];
        this.route.queryParams.subscribe(params => {
            if (params['searchName']) {
                this.searchName = params['searchName'];
            }
        });

        this.csvFileName = this.getFileNameForExport();
    }

    getContacts(searchName?: string, pageNo?: number, pageSize?: number): void {
        //- get all Contacts and send it to the Screen
        this.contactService.GetContacts(searchName, pageNo, pageSize).subscribe
            (
            contacts => {
                this.contacts = contacts;
                this.totalRecords = contacts.length;
            }
            , (error) => {
                this.handleError(error);
            });
    }

    resolveFieldData(data: any, field: string): any {
        if (data && field) {
            if (field.indexOf('.') == -1) {
                return data[field];
            }
            else {
                let fields: string[] = field.split('.');
                let value = data;
                for (var i = 0, len = fields.length; i < len; ++i) {
                    if (value == null) {
                        return null;
                    }
                    value = value[fields[i]];
                }
                return value;
            }
        }
        else {
            return null;
        }
    }

    exportCSV() {
        if (this.contacts != null && this.contacts.length > 0)
            this.primeNgTable.exportCSV();
        else {
            this.messageService.add({ severity: 'warn', summary: 'No Records to download!', detail: 'There is no data available to download.' });
        }
    }

    getContactsLazy(event: LazyLoadEvent) {
        this.pageSize = event.rows;
        var itemsToSkip = event.first;
        this.pageNo = (itemsToSkip / this.pageSize) + 1;

        this.getContacts(this.searchName ? this.searchName : "", this.pageNo, this.pageSize);
    }

    applyFilter() {
        this.primeNgTable.first = 0;
        this.totalRecords = 0;
        this.getContacts(this.searchName ? this.searchName : "", 1, this.pageSize);
    }

    openCreateEditContact() {
        this.contact = undefined;
        this.editCreateIsVisible = true;
    }

    openEditContact(contact: ContactModel) {
        this.editCreateIsVisible = true;
        this.contact = contact;
    }

    clear() {
        this.editContactForm = false;
        this.getContacts();
    }

    onSubmit(f: NgForm) {
        console.log(f.value);  // { first: '', last: '' }
        console.log(f.valid);  // false
    }

    onContactSaved() {
        this.getContacts();
    }

    onUpdateContactClosed() {
        this.editCreateIsVisible = false;
    }

    private getFileNameForExport(): string {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var monthString: string = month > 9 ? "" + month : "0" + month;
        var dayString: string = day > 9 ? "" + day : "0" + day;

        return "OLP_Contacts_" + d.getFullYear() + monthString + dayString + ".csv";
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            this.messageService.add({ severity: 'warn', summary: 'An error occurred', detail: 'error.error.message' });
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            this.messageService.add({ severity: 'warn', summary: errorResponse.statusText, detail: errorResponse.status == 403 ? "User is unauthorized to perform this action." : errorResponse.error });
        }

        if (errorResponse.status == 401) {
            this.router.navigate(["/unauthorized"], { skipLocationChange: true });
            return false;
        }
    }

}