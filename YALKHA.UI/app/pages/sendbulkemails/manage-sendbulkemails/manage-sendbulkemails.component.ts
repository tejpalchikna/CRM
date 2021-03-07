import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { SendBulkEmailModel } from '../sendbulkemails.model';
import { SendBulkEmailsService } from '../sendbulkemails.service';
import { SelectItemModel } from 'app/shared/select-item.model';

@Component({
    selector: 'app-manage-sendbulkemails',
    templateUrl: './manage-sendbulkemails.component.html',
})
export class ManageSendBulkEmailsComponent implements OnChanges {
    @Input() display: boolean = false;
    @Input() public selectedSendBulkEmail: SendBulkEmailModel;

    @Output() onSendBulkEmailSaved = new EventEmitter();
    @Output() onUpdateSendBulkEmailClosed = new EventEmitter();

    selectSendBulkEmailCopy: SendBulkEmailModel = new SendBulkEmailModel();
    isCreate: boolean = false;
    filterSleepTimerResults: SelectItemModel[];
    sleepTimerResults: SelectItemModel[];

    filterMailPriorityResults: SelectItemModel[];
    sleepMailPriority: SelectItemModel[];

    constructor(
        private sendbulkemailService: SendBulkEmailsService,
        private messageService: MessageService
    ) {
        this.fetchAllDropDowns();
    }

    ngOnChanges() {
        if (this.selectedSendBulkEmail) {
            this.selectSendBulkEmail(this.selectedSendBulkEmail);
        }
    }
    fetchAllDropDowns() {
        // this.sleepTimerResults = [
        //     new SelectItemModel(1, 'Sleep 1s'),
        //     new SelectItemModel(1, 'Sleep 2s'),
        //     new SelectItemModel(1, 'Sleep 3s'),
        //     new SelectItemModel(1, 'Sleep 5s'),
        //     new SelectItemModel(1, 'Sleep 8s'),
        //     new SelectItemModel(1, 'Sleep 10s'),
        //     new SelectItemModel(1, 'Sleep 30s'),
        //     new SelectItemModel(1, 'Sleep 60s'),
        //     new SelectItemModel(1, 'Sleep 90s'),
        //     new SelectItemModel(1, 'Sleep 120s'),
        //     new SelectItemModel(1, 'Sleep 150s'),
        //     new SelectItemModel(1, 'Sleep 180'),
        //     new SelectItemModel(1, 'Sleep 240'),
        //     new SelectItemModel(1, 'Sleep 360')
        // ];

        this.sleepMailPriority = [
            new SelectItemModel(1, 'Select'),
            new SelectItemModel(1, 'High'),
            new SelectItemModel(1, 'Normal'),
            new SelectItemModel(1, 'Low')
        ];
    }
    selectSendBulkEmail(selectedSendBulkEmail: SendBulkEmailModel) {
        if (this.selectedSendBulkEmail) {
            this.selectSendBulkEmailCopy = SendBulkEmailModel.mapFromDto(this.selectedSendBulkEmail);
            this.isCreate = false;
        }
        else {
            this.selectSendBulkEmailCopy.reset();
            this.isCreate = true;
        }
    }

    GetSleepTimer(event) {
        var searchTerm: string = null;
        if (event) {
            searchTerm = event.query.toUpperCase();
        }

        this.filterSleepTimerResults = this.sleepTimerResults.filter(item => item.name.toUpperCase().includes(searchTerm));
    }
    GetMailPriority(event) {
        var searchTerm: string = null;
        if (event) {
            searchTerm = event.query.toUpperCase();
        }

        this.filterMailPriorityResults = this.sleepMailPriority.filter(item => item.name.toUpperCase().includes(searchTerm));
    }

    createOrEditSendBulkEmail() {
        this.sendbulkemailService.createOrEditSendBulkEmail(this.selectSendBulkEmailCopy)
            .subscribe(sendbulkemail => {
                if (sendbulkemail) {
                    // if (this.isCreate) {
                    //this.selectSendBulkEmailCopy.ResponseMessage=sendbulkemail.ExceptionMessage;
                    // this.messageService.add({ severity: 'success', summary: 'SendBulkEmail Created', detail: 'SendBulkEmail <strong>' + sendbulkemail.SenderName + '</strong> has been created successfully.' });
                    // } else {
                    //     // this.messageService.add({ severity: 'success', summary: 'SendBulkEmail Updated', detail: 'SendBulkEmail <strong>' + sendbulkemail.SenderName + '</strong> has been updated successfully.' });
                    // }

                    this.onSendBulkEmailSaved.emit()
                    // this.closeUpdateSendBulkEmails();
                }
            }, (error) => {
                this.handleError(error);
            });
    }

    closeUpdateSendBulkEmails() {
        this.onUpdateSendBulkEmailClosed.emit();
        this.selectSendBulkEmailCopy.reset();
        this.selectedSendBulkEmail = undefined;
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