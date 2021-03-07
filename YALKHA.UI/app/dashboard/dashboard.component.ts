import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
//import { Table } from 'primeng/table';

import { DashboardService } from './dashboard.service';
import { Constants } from '../shared/constants';
//import { CollectionResult } from '../shared/collection-result';
import { SelectItemModel } from '../shared/select-item.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
    //@ViewChild('inventoryTable') primeNgTable: Table;

    todayStartIsoString: string;
    todayEndIsoString: string;
    tomorrowStartIsoString: string;
    tomorrowEndIsoString: string;
    yesterdayStartIsoString: string;
    yesterdayEndIsoString: string;

    numberReceivedToday: number;
    numberRepairedToday: number;
    numberShippedToday: number;
    numberNonConformants: number;

    numberReceivedUnits: number;
    totalReceivedUnits: number;
    numberUnitsDueToday: number;
    totalUnitsDueToday: number;
    numberUnitsDueTomorrow: number;
    totalUnitsDueTomorrow: number;
    numberUnitsOverDue: number;

    columns: any[];
    //inventoryItems: InventoryItem[];
    pageSize: number = Constants.DefaultPageSize;
    defaultPageSizeOptions: number[] = Constants.DefaultPageSizeOptions;
    totalRecords: number;

    dueDates: SelectItemModel[];
    selectedDueDate: SelectItemModel;

    private statsRefreshTimerReference;
    constructor(private dashboardService: DashboardService,
        private messageService: MessageService) { }

    ngOnInit() {
        var todayStartDate = new Date();
        todayStartDate.setHours(0, 0, 0, 0);
        this.todayStartIsoString = todayStartDate.toISOString();

        var todayEndDate = new Date(todayStartDate);
        todayEndDate.setHours(23, 59, 59, 99);
        this.todayEndIsoString = todayEndDate.toISOString();

        var tomorrowStartUtc = new Date(todayStartDate);
        tomorrowStartUtc.setDate(tomorrowStartUtc.getDate() + 1);
        tomorrowStartUtc.setHours(0, 0, 0, 0);
        this.tomorrowStartIsoString = tomorrowStartUtc.toISOString();

        var tomorrowEndDateUtc = tomorrowStartUtc;
        tomorrowEndDateUtc.setHours(23, 59, 59, 99);
        this.tomorrowEndIsoString = tomorrowEndDateUtc.toISOString();

        var yesterdayStartUtc = new Date();
        yesterdayStartUtc.setDate(yesterdayStartUtc.getDate() - 1);
        yesterdayStartUtc.setHours(0, 0, 0, 0);
        this.yesterdayStartIsoString = yesterdayStartUtc.toISOString();

        var yesterdayEndDateUtc = yesterdayStartUtc;
        yesterdayEndDateUtc.setHours(23, 59, 59, 99);
        this.yesterdayEndIsoString = yesterdayEndDateUtc.toISOString();


        this.dueDates = [
            new SelectItemModel(1, 'Today'),
            new SelectItemModel(2, 'Tomorrow')
        ];

        this.columns = [
            { field: 'assetTag', header: 'RO #' },
            { field: 'serialNumber', header: 'Serial #' },
            { field: 'partNumber', header: 'Part #' },
            { field: 'process', header: 'Process' },
            { field: 'disposition', header: 'Disposition' },
            { field: 'orderNumber', header: 'RMA #' },
            { field: 'dueDate', header: 'Due Date', pipe: DatePipe, pipeParams: 'shortDate' },
            { field: 'receivedDate', header: 'Received Date', pipe: DatePipe, pipeParams: 'short' },
            { field: 'repairEndDate', header: 'Repaired Date', pipe: DatePipe, pipeParams: 'short' },
            { field: 'shipDate', header: 'Shipped Date', pipe: DatePipe, pipeParams: 'short' },
            { field: 'putAwayBin', header: 'Current Location' }
        ];


        this.loadStats();
        var refreshInterval = 1000000;////10 seconds.
        this.statsRefreshTimerReference = setInterval(() => { this.loadStats(); }, refreshInterval);
    }

    ngOnDestroy() {
        clearInterval(this.statsRefreshTimerReference);
    }

    private getReceivedTodayCount(status?: string, fromDateUtc?: string, endDateUtc?: string) {
        //this.dashboardService.getDashboardAssetCounts(status, fromDateUtc, endDateUtc)
        //    .subscribe(rec => {
        //        this.numberReceivedToday = rec.assetCount;
        //    }, (error) => {
        //        this.handleError(error)
        //    });
    }

    private getRepairedTodayCount(status?: string, fromDateUtc?: string, endDateUtc?: string) {
        //this.dashboardService.getDashboardAssetCounts(status, fromDateUtc, endDateUtc)
        //    .subscribe(rec => {
        //        this.numberRepairedToday = rec.assetCount;
        //    }, (error) => {
        //        this.handleError(error)
        //    });
    }

    private getShippedTodayCount(status?: string, fromDateUtc?: string, endDateUtc?: string) {
        //this.dashboardService.getDashboardAssetCounts(status, fromDateUtc, endDateUtc)
        //    .subscribe(rec => {
        //        this.numberShippedToday = rec.assetCount;
        //    }, (error) => {
        //        this.handleError(error)
        //    });
    }

    private getNonconformantCount(status?: string, fromDateUtc?: string, endDateUtc?: string) {
        //this.dashboardService.getDashboardAssetCounts(status, fromDateUtc, endDateUtc)
        //    .subscribe(rec => {
        //        this.numberNonConformants = rec.assetCount;
        //    }, (error) => {
        //        this.handleError(error)
        //    });
    }

    private getUnitCounts(status?: string, notInProcess?: string, fromDueDateUtc?: string, endDueDateUtc?: string) {
        //this.dashboardService.getDueCounts(status, notInProcess, fromDueDateUtc, endDueDateUtc)
        //    .subscribe(rec => {
        //        this.numberReceivedUnits = rec.ordersCount;
        //    }, (error) => {
        //        this.handleError(error);
        //    });

        //this.dashboardService.getDueCounts("", "", fromDueDateUtc, endDueDateUtc)
        //    .subscribe(rec => {
        //        this.totalReceivedUnits = rec.ordersCount;
        //    }, (error) => {
        //        this.handleError(error);
        //    });
    }

    private getUnitsDueToday(status?: string, notInProcess?: string, fromDueDateUtc?: string, endDueDateUtc?: string) {
        //this.dashboardService.getDueCounts("", notInProcess, fromDueDateUtc, endDueDateUtc)
        //    .subscribe(rec => {
        //        this.numberUnitsDueToday = rec.ordersCount;
        //    }, (error) => {
        //        this.handleError(error);
        //    });

        //this.dashboardService.getDueCounts("", "", fromDueDateUtc, endDueDateUtc)
        //    .subscribe(rec => {
        //        this.totalUnitsDueToday = rec.ordersCount;
        //    }, (error) => {
        //        this.handleError(error);
        //    });
    }

    private getUnitsDueTomorrow(status?: string, notInProcess?: string, fromDueDateUtc?: string, endDueDateUtc?: string) {
        //this.dashboardService.getDueCounts(status, notInProcess, fromDueDateUtc, endDueDateUtc)
        //    .subscribe(rec => {
        //        this.numberUnitsDueTomorrow = rec.ordersCount;
        //    }, (error) => {
        //        this.handleError(error);
        //    });

        //this.dashboardService.getDueCounts("", "", fromDueDateUtc, endDueDateUtc)
        //    .subscribe(rec => {
        //        this.totalUnitsDueTomorrow = rec.ordersCount;
        //    }, (error) => {
        //        this.handleError(error);
        //    });
    }

    private getOverDueUnits(status?: string, notInProcess?: string, fromDueDateUtc?: string, endDueDateUtc?: string) {
        //this.dashboardService.getDueCounts("", notInProcess, fromDueDateUtc, endDueDateUtc)
        //    .subscribe(rec => {
        //        this.numberUnitsOverDue = rec.ordersCount;
        //    }, (error) => {
        //        this.handleError(error)
        //    });
    }

    private loadStats() {
        this.getReceivedTodayCount("", this.todayStartIsoString, this.todayEndIsoString);
        this.getRepairedTodayCount("", this.todayStartIsoString, this.todayEndIsoString);
        this.getShippedTodayCount("", this.todayStartIsoString, this.todayEndIsoString);
        this.getNonconformantCount("", '', '');

        this.getUnitCounts("", "", "", "");
        this.getUnitsDueToday("", "", this.todayStartIsoString, this.todayEndIsoString);
        this.getUnitsDueTomorrow("", "", this.tomorrowStartIsoString, this.tomorrowEndIsoString);
        this.getOverDueUnits("", "", "", this.yesterdayEndIsoString);

    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            this.messageService.add({ severity: 'warn', summary: 'An error occurred', detail: 'error.error.message' });
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            this.messageService.add({ severity: 'warn', summary: errorResponse.statusText, detail: errorResponse.status == 403 ? "User is unauthorized to perform this action." : errorResponse.error });
        }
    }
}
