import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SelectItemModel } from '../../../shared/select-item.model';
import { RolesService } from '../../roles/roles.service';
import { UserModel } from '../users.model';
import { UserService } from '../users.service';

@Component({
    selector: 'app-manage-users',
    templateUrl: './manage-users.component.html',
})
export class ManageUsersComponent implements OnChanges {
    @Input()
    set selectUser(selectUser: UserModel) {
        this.selectUserCopy.reset();
        this.isCreate = true;
        this.selectedUser = selectUser;

        if (this.selectedUser) {
            this.selectUserCopy = UserModel.mapFromDto(this.selectedUser);
            this.isCreate = false;
        }
    }
    get selectUser(): UserModel {
        return this.selectUserCopy;
    }

    display: boolean = false;
    userModel: UserModel[];

    @Output() onUserSaved = new EventEmitter();
    @Output() onUpdateUserClosed = new EventEmitter();

    selectedUser: UserModel;
    selectUserCopy: UserModel = new UserModel();
    rolesResult: SelectItemModel[];
    filterRoleResults: SelectItemModel[];

    facilitiesResult: SelectItemModel[];
    filterFacilityResults: SelectItemModel[];
   
    statusResult: SelectItemModel[];
    filterStatusResults: SelectItemModel[];

    titleResult: SelectItemModel[];
    filterTitleResults: SelectItemModel[];

    isCreate: boolean;
    resetPassword: boolean = false;

    constructor(
        private userService: UserService,
        private roleService: RolesService,
        private messageService: MessageService,
    ) {
        this.fetchAllDropDowns();
    }

    fetchAllDropDowns() {
        this.statusResult = [
            new SelectItemModel(1, "Pending", "P"),
            new SelectItemModel(2, "Approved", "A"),
            new SelectItemModel(3, "Rejected", "R"),
            new SelectItemModel(4, "Blocked", "B")
        ];

        this.titleResult = [
            new SelectItemModel(1, 'Mr.'),
            new SelectItemModel(2, 'Dr.'),
            new SelectItemModel(3, 'Mrs.'),
            new SelectItemModel(4, 'Miss')
        ];

        this.getAllRoles();
        this.getAllFacilities();
    }

    ngOnChanges() {
        this.getAllRoles();
        this.getAllFacilities();
    }

    createOrEditUser() {
        this.userService.createOrUpdateUser(this.selectUserCopy)
            .subscribe(user => {
                if (user) {
                    if (this.isCreate) {
                        this.messageService.add({ severity: 'success', summary: 'User Created', detail: 'User <strong>' + user.UserID + '</strong> has been created successfully.' });
                    }
                    else {
                        this.messageService.add({ severity: 'success', summary: 'User Updated', detail: 'User <strong>' + user.UserID + '</strong> has been updated successfully.' });
                    }

                    this.closeUpdateUsers();
                    this.onUserSaved.emit()
                   
                }
            }, (error) => {
                this.handleError(error);
            });
    }

    closeUpdateUsers() {
        this.onUpdateUserClosed.emit();
        this.selectedUser = undefined;
        this.selectUserCopy.reset();
    }

    getRoles(event): void {
        var searchTerm: string = null;
        if (event) {
            searchTerm = event.query.toUpperCase();
        }

        this.filterRoleResults = this.rolesResult.filter(item => item.name.toUpperCase().includes(searchTerm));
    }

    getAllRoles(): void {
        this.roleService.GetRoles().subscribe(res => {
            if (res) {
                var selectRoles: SelectItemModel[] = [];
                for (let item of res) {
                    var selectItem = new SelectItemModel(item.Id, item.RoleName);
                    selectRoles.push(selectItem);
                }

                this.rolesResult = selectRoles;
            }
        });
    }

    getAllFacilities(): void {
        this.userService.GetFacilities().subscribe(res => {
            if (res) {
                var selectFacilities: SelectItemModel[] = [];
                for (let item of res.items) {
                    var selectItem = new SelectItemModel(item.Code, item.Name);
                    selectFacilities.push(selectItem);
                }

                this.facilitiesResult = selectFacilities;
            }
        });
    }

    getFacilities(event) {
        var searchTerm: string = null;
        if (event) {
            searchTerm = event.query.toUpperCase();
        }

        this.filterFacilityResults = this.facilitiesResult.filter(item => item.name.toUpperCase().includes(searchTerm));
    }

    getStatuses(event) {
        var searchTerm: string = null;
        if (event) {
            searchTerm = event.query.toUpperCase();
        }

        this.filterStatusResults = this.statusResult.filter(item => item.name.toUpperCase().includes(searchTerm));
    }

    getTitles(event) {
        var searchTerm: string = null;
        if (event) {
            searchTerm = event.query.toUpperCase();
        }

        this.filterTitleResults = this.titleResult.filter(item => item.name.toUpperCase().includes(searchTerm));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            this.messageService.add({ severity: 'error', summary: 'An error occurred', detail: 'error.error.message' });
        } else {
            this.messageService.add({ severity: 'error', summary: errorResponse.statusText, detail: errorResponse.status == 403 ? "User is unauthorized to perform this action." : errorResponse.error });
        }
    }
}