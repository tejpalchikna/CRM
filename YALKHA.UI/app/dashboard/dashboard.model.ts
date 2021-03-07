export class DashboardAssetCount {
	assetCount: number;

    mapFromDto(dashboardAssetCountDto: any): DashboardAssetCount {
		this.assetCount = dashboardAssetCountDto.assetCount;
        return this;
    }
}

export class DashboardOrderCount {
	ordersCount: number;

	mapFromDto(dashboardOrderCountDto: any): DashboardOrderCount {
		this.ordersCount = dashboardOrderCountDto.ordersCount;
		return this;
	}
}