export class BaseModel {
    id: number;
    name: string;
    code: string;

    constructor(id: number, name: string = "", code = "") {
        this.id = id;
        this.name = name;
        this.code = code;
    }
}