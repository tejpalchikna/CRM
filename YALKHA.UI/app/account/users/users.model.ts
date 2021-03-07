import { SelectItem } from 'primeng/api';
import { BaseModel } from '../../core/base.model';
import { SelectItemModel } from '../../shared/select-item.model';
import { RoleModel } from '../roles/roles.model';
import { User } from '../../shared/user.model';

export class FacilityModel {
    Id: number;
    Code: string;
    Name: string;
    Description: string;
    ParentId: number;
    IsDeleted: boolean;

    public static mapFromDto(dto: any): FacilityModel {
        var model = new FacilityModel();
        model.Code = dto.Code;
        model.Description = dto.Description;
        model.Id = dto.Id;
        model.IsDeleted = dto.IsDeleted;
        model.Name = dto.Name;
        model.ParentId = dto.ParentId;

        return model;
    }

    mapToDto(): any {
        var facilityDto: any = {};
        facilityDto.Id = this.Id;
        facilityDto.Code = this.Code;
        facilityDto.Name = this.Name;
        facilityDto.Description = this.Description;
        facilityDto.ParentId = this.ParentId;
        facilityDto.IsDeleted = this.IsDeleted;

        return facilityDto;
    }
}

export class UserModel {
    UserID?: number;
    FirstName: string;
    LastName: string;
    FullName: string;
    Email: string;
    PhoneNo: string;
    EmpId: boolean;

    RegistredDate: string;
    StatusName: string;
    Password: string;
    ConfirmPassword: string;
    ApprovedDate: string;
    ApprovedBy: string;

    RoleId: number;
    RoleName: string;
    Role: SelectItemModel;
    RoleList: RoleModel[];

    Status: SelectItemModel;
    Title: SelectItemModel;

    FacilityId: string;
    FacilityName: string;
    Facility: SelectItemModel;
    FacilityList: FacilityModel[];

    constructor() {
    }

    public static mapFromDto(dto: any): UserModel {
        var model = new UserModel();
        model.EmpId = dto.Id;
        model.UserID = dto.UserID;
        model.ApprovedBy = dto.ApprovedBy;
        model.ApprovedDate = dto.ApprovedDate;
        model.FirstName = dto.FirstName;
        model.LastName = dto.LastName;
        model.FullName = dto.FirstName + " " + dto.LastName;
        model.RoleName = dto.RoleName;
        model.RoleId = dto.RoleId;
        model.Role = new SelectItemModel(dto.RoleId, dto.RoleName);
        model.RoleList = dto.UserRolesList;
        model.RegistredDate = dto.RegistredDate;

        if (dto.Status instanceof SelectItemModel) {
            model.Status = dto.Status;
        }
        else {
            model.Status = new SelectItemModel(0, dto.StatusName, dto.Status);
        }

        if (dto.Title instanceof SelectItemModel) {
            model.Title = dto.Title;
        }
        else {
            model.Title = new SelectItemModel(0, dto.Title != null ? dto.Title : 'Mr.');
        }

        model.Email = dto.Email;
        model.PhoneNo = dto.PhoneNo;
        model.FacilityId = dto.FacilityId;
        model.FacilityName = dto.FacilityName;
        model.Facility = new SelectItemModel(dto.FacilityId, dto.FacilityName);
        model.FacilityList = dto.FacilityList;

        return model;
    }

    mapToDto(): any {
        var userDto: any = {};
        userDto.UserTypes = "";

        if (this.Role) {
            userDto.RoleId = this.Role.id;
            userDto.RoleName = this.Role.name;
        }
        else {
            userDto.RoleId = this.RoleId;
            userDto.RoleName = this.RoleName;
        }

        if (this.Facility) {
            userDto.FacilityId = this.Facility.id;
            userDto.FacilityName = this.Facility.name;
        }
        else {
            userDto.FacilityId = this.FacilityId;
            userDto.FacilityName = this.FacilityName;
        }

        if (this.Status) {
            userDto.Status = this.Status.code;
        }

        if (this.Title) {
            userDto.Title = this.Title.name;
        }

        userDto.UserID = this.UserID;
        userDto.Password = this.Password;
        userDto.ConfirmPassword = this.ConfirmPassword;
        userDto.FirstName = this.FirstName;
        userDto.LastName = this.LastName;
        userDto.PhoneNo = this.PhoneNo;
        userDto.Email = this.Email;
        userDto.ApprovedBy = this.ApprovedBy;
        userDto.ApprovedDate = this.ApprovedDate;
        userDto.RegistredDate = this.RegistredDate
        userDto.UserRolesList = this.RoleList;

        return userDto;
    }

    reset() {
        this.EmpId = undefined;
        this.ApprovedDate = undefined;
        this.UserID = undefined;
        this.ApprovedBy = undefined;
        this.ApprovedDate = undefined;
        this.ConfirmPassword = undefined;
        // this.CreatedBy = undefined;
        // this.CreatedDate = undefined;
        this.Email = undefined;
        this.Facility = undefined;
        this.FacilityId = undefined;
        this.FacilityName = undefined;
        this.FirstName = undefined;
        this.LastName = undefined;
        this.Password = undefined;
        this.PhoneNo = undefined;
        this.Role = undefined;
        this.RoleId = undefined;
        this.RoleName = undefined;
        this.Status = undefined;
    }
}
