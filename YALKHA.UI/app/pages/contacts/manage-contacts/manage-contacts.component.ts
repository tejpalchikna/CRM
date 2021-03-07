import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ContactModel } from '../contacts.model';
import { ContactsService } from '../contacts.service';

@Component({
    selector: 'app-manage-contacts',
    templateUrl: './manage-contacts.component.html',
})
export class ManageContactsComponent implements OnChanges {
    @Input() display: boolean = false;
    @Input() public selectedContact: ContactModel;

    @Output() onContactSaved = new EventEmitter();
    @Output() onUpdateContactClosed = new EventEmitter();

    selectContactCopy: ContactModel = new ContactModel();
    isCreate: boolean = false;

    constructor(
        private contactService: ContactsService,
        private messageService: MessageService
    ) { }

    ngOnChanges() {
        if (this.selectedContact) {
            this.selectContact(this.selectedContact);
        }
    }

    selectContact(selectedContact: ContactModel) {
        if (this.selectedContact) {
            this.selectContactCopy = ContactModel.mapFromDto(this.selectedContact);
            this.isCreate = false;
        }
        else {
            this.selectContactCopy.reset();
            this.isCreate = true;
        }
    }

    createOrEditContact() {
        this.contactService.createOrEditContact(this.selectContactCopy)
            .subscribe(contact => {
                if (contact) {
                    if (this.isCreate) {
                        this.messageService.add({ severity: 'success', summary: 'Contact Created', detail: 'Contact <strong>' + contact.FirstName + " " + contact.LastName + '</strong> has been created successfully.' });
                    } else {
                        this.messageService.add({ severity: 'success', summary: 'Contact Updated', detail: 'Contact <strong>' + contact.FirstName + " " + contact.LastName + '</strong> has been updated successfully.' });
                    }

                    this.onContactSaved.emit()
                    this.closeUpdateContacts();
                }
            }, (error) => {
                this.handleError(error);
            });
    }

    closeUpdateContacts() {
        this.onUpdateContactClosed.emit();
        this.selectContactCopy.reset();
        this.selectedContact = undefined;
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