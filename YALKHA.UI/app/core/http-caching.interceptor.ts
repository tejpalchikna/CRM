
import {delay,  startWith, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpHeaders, HttpRequest, HttpResponse,
    HttpInterceptor, HttpHandler
} from '@angular/common/http';

import { Observable ,  of } from 'rxjs';

import { HttpRequestCache } from './http-request-cache.service';


/**
 * If request is cachable (e.g., package search) and
 * response is in cache return the cached response as observable.
 * If has 'x-refresh' header that is true,
 * then also re-run the package search, using response from next(),
 * returning an observable that emits the cached response first.
 *
 * If not in cache or not cachable,
 * pass request through to next()
 */
@Injectable()
export class HttpCachingInterceptor implements HttpInterceptor {
    constructor(private cache: HttpRequestCache) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // continue if not cachable.
        if (!isCachable(req)) { return next.handle(req); }

        const cachedResponse = this.cache.get(req);
        // cache-then-refresh
        if (req.headers.get('x-refresh')) {
            const results$ = sendRequest(req, next, this.cache);
            return cachedResponse ?
                results$.pipe(startWith(cachedResponse)) :
                results$;
        }

         ////Adding delay to the cached data as a fix to Primeng table bug that loads the table too early.
        // cache-or-fetch
        return cachedResponse ?
            of(cachedResponse).pipe(delay(0)) : sendRequest(req, next, this.cache);
    }
}


/** Is this request cachable? */
function isCachable(req: HttpRequest<any>) {
    // Only GET requests are cachable
    return req.method === 'GET';
}

/**
 * Get server response observable by sending request to `next()`.
 * Will add the response to the cache on the way out.
 */
function sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: HttpRequestCache): Observable<HttpEvent<any>> {

    // No headers allowed in npm search request
    const noHeaderReq = req.clone({ headers: new HttpHeaders() });

    return next.handle(noHeaderReq).pipe(
        tap(event => {
            // There may be other events besides the response.
            if (event instanceof HttpResponse) {
                cache.put(req, event); // Update the cache.
            }
        })
    );
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/