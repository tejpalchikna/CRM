import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { MessageService, LazyLoadEvent } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { UserModel } from './users.model';
import { UserService } from './users.service';
import { Constants } from '../../shared/constants';
import { Table } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleModel } from '../roles/roles.model';
import { DatePipe } from '@angular/common';


@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

    @ViewChild('usersTable', { static: false }) primeNgTable: Table;
    pageSize: number = Constants.DefaultPageSize;
    defaultPageSizeOptions: number[] = Constants.DefaultPageSizeOptions;
    pageNo: number = 1;
    includeInactive: boolean = false;
    searchName: string;
    paramSearchName: string;

    editUserForm = false; //- on Start set this to hide
    cols: { field: string, header: string, pipe?: any, pipeParams?: string }[];
    totalRecords: number;
    users: UserModel[]; //- multiple users possible
    user: UserModel; //- only one role
    editCreateIsVisible: boolean = false;
    deleteIsVisible: boolean;
    RoleList: RoleModel[];
    csvFileName: string;

    constructor(
        private injector: Injector,
        private userService: UserService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.totalRecords = 0;

        this.cols = [
            { field: 'UserID', header: 'User Id' },
            { field: 'Title.name', header: 'Title' },
            { field: 'FirstName', header: 'First Name' },
            { field: 'LastName', header: 'Last Name' },
            { field: 'FullName', header: 'Full Name' },
            { field: 'RoleName', header: 'Access Level' },
            { field: 'Status.name', header: 'Status' },
            { field: 'RegistredDate', header: 'Reg Date', pipe: DatePipe, pipeParams: 'short' },
            { field: 'ApprovedDate', header: 'Approved Date', pipe: DatePipe, pipeParams: 'short' },
            { field: 'ApprovedBy', header: 'Approved By' }
        ];

        this.csvFileName = this.getFileNameForExport();

        this.route.queryParams.subscribe(params => {
            if (params['searchName']) {
                this.searchName = params['searchName'];
            }
        });
    }

    getUsers(searchName?: string, pageNo?: number, pageSize?: number): void {
        //- get all Users and send it to the Screen
        this.userService.GetUsers(searchName, pageNo, pageSize).subscribe
            (
                users => {
                    this.users = users.items;
                    //console.log("Users", this.users);
                    this.totalRecords = users.totalCount;
                }
                , (error) => {
                    this.handleError(error);
                });
    }

    getUsersLazy(event: LazyLoadEvent) {
        this.pageSize = event.rows;
        var itemsToSkip = event.first;
        this.pageNo = (itemsToSkip / this.pageSize) + 1;

        this.getUsers(this.searchName ? this.searchName : "", this.pageNo, this.pageSize);
    }

    applyFilter() {
        this.primeNgTable.first = 0;
        this.getUsers(this.searchName ? this.searchName : "", 1, this.pageSize);
    }

    openCreateEditUser() {
        this.user = undefined;
        this.editCreateIsVisible = true;
    }

    openEditUser(user: UserModel) {
        this.editCreateIsVisible = true;
        this.user = user;
    }

    clear() {
        this.editUserForm = false;
        this.getUsers();
    }

    onSubmit(f: NgForm) {
        console.log(f.value);  // { first: '', last: '' }
        console.log(f.valid);  // false
    }

    onUserSaved() {
        this.getUsers();
    }

    onUpdateUserClosed() {
        this.editCreateIsVisible = false;
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

    getFormattedTextForExport = (cellData) => {
        var column = this.cols.find(item => item.field == cellData.field);
        if (column.pipe) {
            let pipeInstance = this.injector.get(column.pipe);
            return pipeInstance.transform(cellData.data, column.pipeParams);
        }
        return cellData.data;
    }

    exportCSV() {
        if (this.users != null && this.users.length > 0)
            this.primeNgTable.exportCSV();
        else {
            this.messageService.add({ severity: 'warn', summary: 'No Records to download!', detail: 'There is no data available to download.' });
        }
    }

    private getFileNameForExport(): string {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var monthString: string = month > 9 ? "" + month : "0" + month;
        var dayString: string = day > 9 ? "" + day : "0" + day;

        return "OLP_Users_" + d.getFullYear() + monthString + dayString + ".csv";
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