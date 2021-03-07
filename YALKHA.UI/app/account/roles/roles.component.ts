import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { MessageService, LazyLoadEvent } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { RoleModel } from './roles.model';
import { RolesService } from './roles.service';
import { Constants } from '../../shared/constants';
import { Table } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionableBooleanPipe } from '../../shared/pipes/questionable-boolean.pipe';
import { PipeExecutorPipe } from '../../shared/pipes/pipe-executor.pipe';


@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.css'],
    //providers: [DialogService]

})
export class RolesComponent implements OnInit {

    @ViewChild('rolesTable', { static: false }) primeNgTable: Table;
    cols: { field: string, header: string, pipe?: any, pipeParams?: string }[];
    pageSize: number = Constants.DefaultPageSize;
    defaultPageSizeOptions: number[] = Constants.DefaultPageSizeOptions;
    pageNo: number = 1;
    includeInactive: boolean = false;
    searchName: string;
    paramSearchName: string;

    editRoleForm = false; //- on Start set this to hide

    totalRecords: number;
    //- this gets the export Role class from the role.model.ts
    roles: RoleModel[]; //- multiple roles possible
    role: RoleModel; //- only one role
    //permissions: PermissionModel[]; //- multiple Permissions possible
    editCreateIsVisible: boolean;
    deleteIsVisible: boolean;
    csvFileName: string;

    constructor(
        private injector: Injector,
        private roleService: RolesService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }


    ngOnInit() {
        this.totalRecords = 0;

        this.cols = [
            { field: 'RoleName', header: 'Role Name' },
            { field: 'RoleType', header: 'Role Type' },
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

    getRoles(searchName?: string, pageNo?: number, pageSize?: number): void {
        //- get all Roles and send it to the Screen
        this.roleService.GetRoles(searchName, pageNo, pageSize).subscribe
            (
            roles => {
                this.roles = roles;
                this.totalRecords = roles.length;
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
        if (this.roles != null && this.roles.length > 0)
            this.primeNgTable.exportCSV();
        else {
            this.messageService.add({ severity: 'warn', summary: 'No Records to download!', detail: 'There is no data available to download.' });
        }
    }

    getRolesLazy(event: LazyLoadEvent) {
        this.pageSize = event.rows;
        var itemsToSkip = event.first;
        this.pageNo = (itemsToSkip / this.pageSize) + 1;

        this.getRoles(this.searchName ? this.searchName : "", this.pageNo, this.pageSize);
    }

    applyFilter() {
        this.primeNgTable.first = 0;
        this.totalRecords = 0;
        this.getRoles(this.searchName ? this.searchName : "", 1, this.pageSize);
    }

    openCreateEditRole() {
        this.role = undefined;
        this.editCreateIsVisible = true;
    }

    openEditRole(role: RoleModel) {
        this.editCreateIsVisible = true;
        this.role = role;
    }

    clear() {
        this.editRoleForm = false;
        this.getRoles();
    }

    onSubmit(f: NgForm) {
        console.log(f.value);  // { first: '', last: '' }
        console.log(f.valid);  // false
    }

    onRoleSaved() {
        this.getRoles();
    }

    onUpdateRoleClosed() {
        this.editCreateIsVisible = false;
    }

    private getFileNameForExport(): string {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var monthString: string = month > 9 ? "" + month : "0" + month;
        var dayString: string = day > 9 ? "" + day : "0" + day;

        return "OLP_Roles_" + d.getFullYear() + monthString + dayString + ".csv";
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