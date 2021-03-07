
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { DashboardAssetCount, DashboardOrderCount } from './dashboard.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashboardService {
	private dashboardUrl = 'Dashboard';

	constructor(private http: HttpClient) { }

	getDashboardAssetCounts(status?: string, fromDateUtcString?: string, endDateUtcString?: string): Observable<DashboardAssetCount>{
		var url = this.dashboardUrl + `/AssetCounts?status=${status}&fromDateUtcString=${fromDateUtcString}&endDateUtcString=${endDateUtcString}`;
		return this.http.get(url).pipe(map((res: any) => {
			if (res) {
				var dashboardAsset = new DashboardAssetCount();
				dashboardAsset = dashboardAsset.mapFromDto(res);
				return dashboardAsset;
			}
			return null;
		}));
	}

	getDueCounts(inProcessCodes?: string, notInProcessCodes?: string, fromDueDateIsoString?: string, endDueDateIsoString?: string): Observable<DashboardOrderCount> {
		var url = `${this.dashboardUrl}/DueCounts?inProcessCodes=${inProcessCodes}&notInProcessCodes=${notInProcessCodes}&fromDueDateIsoString=${fromDueDateIsoString}&endDueDateIsoString=${endDueDateIsoString}`;
		return this.http.get(url).pipe(map((res: any) => {
			if (res) {
				var dashboardDueCount = new DashboardOrderCount();
				dashboardDueCount = dashboardDueCount.mapFromDto(res);
				return dashboardDueCount;
			}
			return null;
		}));
	}
}