import { SelectItem } from 'primeng/api';
import { SelectItemModel } from '../../shared/select-item.model';

export class ContactModel {
    Id?: number;
    FirstName: string;
    LastName: string;
    Designation: string;
    Email: string;
    AlternateEmail: string;
    OfficePhone: string;
    MobileNbr: string;
    AlternateMobile: string;
    DOB: string;
    Anniversary: string;
    City: string;
    State: string;
    Active: boolean;
    Country: string;
    CreatedBy: string;
    DesignationList: SelectItem[];
    StateList: SelectItem[];
    CityList: SelectItem[];
    CountryList: SelectItemModel[];
    constructor() {
        this.DesignationList = [
            { label: 'OLP', value: 'OLP' },
            { label: 'ETOS', value: 'ETOS' }
        ];
    }

    public static mapFromDto(dto: any): ContactModel {
        var model = new ContactModel();

        model.Id = dto.Id;
        model.Active = dto.Active;
        model.CreatedBy = dto.CreatedBy;

        return model;
    }

    mapToDto(): any {
        var contactDto: any = {};
        contactDto.Id = this.Id;
        contactDto.Active = this.Active;
        contactDto.AlternateEmail = this.AlternateEmail;
        contactDto.AlternateMobile = this.AlternateMobile;
        contactDto.Anniversary = this.Anniversary;
        contactDto.City = this.City;
        contactDto.CityList = this.CityList;
        contactDto.Country = this.Country;
        contactDto.CountryList = this.CountryList;
        contactDto.CreatedBy = this.CreatedBy;
        contactDto.DOB = this.DOB;
        contactDto.Designation = this.Designation;
        contactDto.DesignationList = this.DesignationList;
        contactDto.Email = this.Email;
        contactDto.FirstName = this.FirstName;
        contactDto.LastName = this.LastName;
        contactDto.MobileNbr = this.MobileNbr;
        contactDto.OfficePhone = this.OfficePhone;
        contactDto.State = this.State;
        contactDto.StateList = this.StateList;
        contactDto.Active = this.Active;
        contactDto.CreatedBy = this.CreatedBy;
        return contactDto;
    }

    reset() {
        this.Id = undefined;
        this.Active = undefined;
        this.AlternateEmail = undefined;
        this.AlternateMobile = undefined;
        this.Anniversary = undefined;
        this.City = undefined;
        this.CityList = undefined;
        this.Country = undefined;
        this.CountryList = undefined;
        this.CreatedBy = undefined;
        this.DOB = undefined;
        this.Designation = undefined;
        this.DesignationList = undefined;
        this.Email = undefined;
        this.FirstName = undefined;
        this.Id = undefined;
        this.LastName = undefined;
        this.MobileNbr = undefined;
        this.OfficePhone = undefined;
        this.State = undefined;
        this.StateList = undefined;
    }
}
