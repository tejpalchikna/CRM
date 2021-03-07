import { Injectable, Injector } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class LoggerService {
    constructor(private messageService: MessageService) { }
    log(msg: string) {
        console.log(msg);
    }

    error(msg: string) {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: msg });
    }
}