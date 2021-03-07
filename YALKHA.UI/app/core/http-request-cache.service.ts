import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

export interface HttpRequestCacheEntry {
    url: string;
    response: HttpResponse<any>;
    lastRead: number;
}

export abstract class HttpRequestCache {
    abstract get(req: HttpRequest<any>): HttpResponse<any> | undefined;
    abstract put(req: HttpRequest<any>, response: HttpResponse<any>): void
}

const maxAge = 30000; // maximum cache age (ms)

@Injectable()
export class HttpRequestCacheWithMap implements HttpRequestCache {

    cache = new Map<string, HttpRequestCacheEntry>();

    constructor() { }

    get(req: HttpRequest<any>): HttpResponse<any> | undefined {
        const url = req.urlWithParams;
        const cached = this.cache.get(url);

        if (!cached) {
            return undefined;
        }

        const isExpired = cached.lastRead < (Date.now() - maxAge);
        return isExpired ? undefined : cached.response;
    }

    put(req: HttpRequest<any>, response: HttpResponse<any>): void {
        const url = req.urlWithParams;

        const entry = { url, response, lastRead: Date.now() };
        this.cache.set(url, entry);

        // remove expired cache entries
        const expired = Date.now() - maxAge;
        this.cache.forEach(entry => {
            if (entry.lastRead < expired) {
                this.cache.delete(entry.url);
            }
        });
    }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/