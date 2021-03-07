export class SelectItemModel {
    id: number;
    name: string;
    code: string;
    isDisabled: boolean;

    constructor(id: number, name: string = "", code = "", isDisabled = false) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.isDisabled = isDisabled;
    }
}