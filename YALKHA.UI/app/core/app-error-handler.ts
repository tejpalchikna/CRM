import { ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { LoggerService } from './logger.service';

export class AppErrorHandler implements ErrorHandler {
    constructor(private loggerService: LoggerService) { }

    handleError(error: any) {
        this.logError(error);
    }

    private logError(error: any) {
        var errorString = "";
        if (error instanceof HttpErrorResponse) {
            ////If the response is unauthorized, redirect to login page.
            if (error.status == 401) {
                window.location.href = '/login?redirecturl=' + encodeURIComponent(window.location.href);
                return;
            }
            if (error.error) {
                errorString = error.error;
            }
            else {
                errorString = error.statusText
            }            
        } else if (error instanceof TypeError) {
            errorString = error.message;
            console.log(error.stack);
        } else if (error instanceof Error) {
            errorString = error.message;
            console.log(error.stack);
        } else {
            errorString = error;
        }

        this.loggerService.error(errorString);
    }
}