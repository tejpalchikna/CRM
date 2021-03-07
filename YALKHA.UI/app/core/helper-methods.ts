import { ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

export class HelperMethods {
    constructor() { }

    IsValidJsonString(str): boolean {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}