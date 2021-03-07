import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
    msgs: Message[] = [];

    subscription: Subscription;
    constructor(private changeDetectorRef: ChangeDetectorRef, private messageService: MessageService) {

    }

    ngOnInit() {
        ////Subscribe to PrimeNG message notifications.
        this.subscribeToNotifications();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    private subscribeToNotifications() {
        this.subscription = this.messageService.messageObserver.subscribe(messages => {
            this.msgs.length = 0;
            if (messages instanceof Array)
                this.msgs.push.apply(this.msgs, messages);
            else
                this.msgs.push(messages);

            ////For some reason, Angular does not detect the changes to this.messages variable. 
            ////So manually requesting Angular to detect changes on this component.
            this.changeDetectorRef.detectChanges();
        });
    }
}