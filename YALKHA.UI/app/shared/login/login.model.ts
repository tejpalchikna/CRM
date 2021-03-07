export class LoginModel {
    IsSuccessful: boolean;
    Message: string;
    Token: string;

    mapFromDto(dto: any) {
        this.Message = dto.IsSuccessful != undefined ? dto.SuccessMessage : dto.ExceptionMessage;
        this.IsSuccessful = dto.IsSuccessful;
        this.Token = dto.Entity.Token;
    }

    //mapToDto(): any {
    //    var roleDto: any = {};
    //    roleDto.id = this.Id;
    //    roleDto.name = this.RoleName;
    //    roleDto.roletype = this.Role_Type;
    //    return roleDto;
    //}
}
