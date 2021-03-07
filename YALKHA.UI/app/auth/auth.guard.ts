import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
    Router
} from "@angular/router";
import { GlobalVariableService } from "../shared/global-variable.service";
import { Constants } from "../shared/constants";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private globalVar: GlobalVariableService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let data: string = (localStorage.getItem(Constants.TokenValidityKey));
        if (data != undefined) {
            let userdata: any = JSON.parse(data);
            if (userdata != undefined) {
                this.globalVar.setAthentication(data, true);
                let permissions = route.data["permissions"] as Array<string>;

                if (!permissions || permissions.length == 0) {
                    return true;
                }

                if (userdata.PermissionsList && userdata.PermissionsList.some(existingPermission => permissions.indexOf(existingPermission) >= 0)) {
                    return this.globalVar.isAuthenticated;
                }
                else {
                    this.router.navigate(["unauthorized"], { skipLocationChange: true });
                    return true;
                }
            }
            else {
                userdata.PermissionsList = null;
            }
        } else {
            this.router.navigate(["login"], {
                queryParams: { returnUrl: state.url }
            });
            return false;
        }
    }
}
