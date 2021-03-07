export class Constants {
    static DefaultPageSize = 50;
    static DefaultPageSizeOptions = [25, 50, 100, 250, 500];
    static ExtendedPageSizeOptions = [25, 50, 100, 250, 500, 1000, 2000];
    static CartonStatus = class {
        static readonly Open = "Open";
        static readonly Closed = "Closed";
    }
    static readonly TokenValidityKey = "userdata";
    static readonly RefreshTokenKey = "RefreshTokenKey";
}