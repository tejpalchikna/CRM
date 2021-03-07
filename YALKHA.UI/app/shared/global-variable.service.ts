import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Constants } from "./constants";
import { SelectItem } from "primeng/api";
import { Router } from "@angular/router";
import { HelperMethods } from "../core/helper-methods";

@Injectable()
export class GlobalVariableService {
    public isAuthenticated: boolean;
    public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
    roleList: SelectItem[];
    currentRoleId: string;
    currentRoleName: string;
    company: string;
    facilityId: string;
    UserName: string;
    facilityName: string;
    displayName: string;
    constructor(private router: Router, private helperMethods: HelperMethods) {
        this.isAuthenticated = false;
    }

    setAthentication(details: any, isAuthenticated: boolean): void {
        if (details != null && details != undefined) {

            let data: any;
            if (this.helperMethods.IsValidJsonString(details)) {
                data = JSON.parse(details);
            }
            else {
                data = details;
            }
            this.isAuthenticated = isAuthenticated;
            this.roleList = data.RolesList;
            this.currentRoleId = data.RoleId;
            this.currentRoleName = data.RoleName;
            this.displayName = data.Name;
            this.UserName = data.UserName;
            this.facilityId = data.FacilityId;
            this.facilityName = data.FacilityName;
            this.isUserLoggedIn.next(isAuthenticated);
        }
        else {
            this.isAuthenticated = isAuthenticated;
            this.router.navigate(["login"]);
        }
    }

    getAuthentication(): boolean {
        return this.isAuthenticated;
    }
}
