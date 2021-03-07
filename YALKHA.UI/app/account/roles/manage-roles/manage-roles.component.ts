import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { RoleModel } from '../roles.model';
import { RolesService } from '../roles.service';

@Component({
    selector: 'app-manage-roles',
    templateUrl: './manage-roles.component.html',
})
export class ManageRolesComponent implements OnChanges {
    @Input() display: boolean = false;
    @Input() public selectedRole: RoleModel;

    @Output() onRoleSaved = new EventEmitter();
    @Output() onUpdateRoleClosed = new EventEmitter();

    selectRoleCopy: RoleModel = new RoleModel();
    isCreate: boolean = false;

    constructor(
        private roleService: RolesService,
        private messageService: MessageService
    ) { }

    ngOnChanges() {
        if (this.selectedRole) {
            this.selectRole(this.selectedRole);
        }
    }

    selectRole(selectedRole: RoleModel) {
        if (this.selectedRole) {
            this.selectRoleCopy = RoleModel.mapFromDto(this.selectedRole);
            this.isCreate = false;
        }
        else {
            this.selectRoleCopy.reset();
            this.isCreate = true;
        }
    }

    createOrEditRole() {
        this.roleService.createOrEditRole(this.selectRoleCopy)
            .subscribe(role => {
                if (role) {
                    if (this.isCreate) {
                        this.messageService.add({ severity: 'success', summary: 'Role Created', detail: 'Role <strong>' + role.RoleName + '</strong> has been created successfully.' });
                    } else {
                        this.messageService.add({ severity: 'success', summary: 'Role Updated', detail: 'Role <strong>' + role.RoleName + '</strong> has been updated successfully.' });
                    }

                    this.onRoleSaved.emit()
                    this.closeUpdateRoles();
                }
            }, (error) => {
                this.handleError(error);
            });
    }

    closeUpdateRoles() {
        this.onUpdateRoleClosed.emit();
        this.selectRoleCopy.reset();
        this.selectedRole = undefined;
        this.isCreate = true;
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            this.messageService.add({ severity: 'error', summary: 'An error occurred', detail: 'error.error.message' });
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            this.messageService.add({ severity: 'error', summary: errorResponse.statusText, detail: errorResponse.status == 403 ? "User is unauthorized to perform this action." : errorResponse.error });
        }
    }
}