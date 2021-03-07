import { SelectItem } from 'primeng/api';

export class RoleModel {
    Id?: number;
    RoleName: string;
    RoleType: string;
    Active: boolean;
    CreatedBy: string;
    RoleTypeList: SelectItem[];
    constructor() {
        this.RoleTypeList = [
            { label: 'OLP', value: 'OLP' },
            { label: 'ETOS', value: 'ETOS' }
        ];
    }

    public static mapFromDto(dto: any): RoleModel {
        var model = new RoleModel();

        model.Id = dto.Id;
        model.RoleType = dto.RoleType;
        model.RoleName = dto.RoleName;
        model.Active = dto.Active;
        model.CreatedBy = dto.CreatedBy;

        return model;
    }

    mapToDto(): any {
        var roleDto: any = {};
        roleDto.Id = this.Id;
        roleDto.RoleName = this.RoleName;
        roleDto.RoleType = this.RoleType;
        roleDto.Active = this.Active;
        roleDto.CreatedBy = this.CreatedBy;
        return roleDto;
    }

    reset() {
        this.Id = undefined;
        this.RoleName = undefined;
        this.RoleType = undefined;
    }
}
