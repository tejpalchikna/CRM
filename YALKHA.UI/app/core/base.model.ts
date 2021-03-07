export class BaseModel {
    Id: number;
    CreatedBy: string;
    CreatedDate: Date;
    IsActive: boolean;
    Count: 0;
    Entity: string;
    ExceptionMessage: string;
    HasExceptionError: boolean;
    IsSuccessful: boolean;
    IsValid: boolean;
    constructor(id: number, createdby: string = "", currentdate: Date = null, isactive: boolean) {
        this.Id = id;
        this.CreatedBy = createdby;
        this.CreatedDate = currentdate;
        this.IsActive = isactive;
    }
}