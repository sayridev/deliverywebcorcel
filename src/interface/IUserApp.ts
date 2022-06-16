export interface IUserApp {
    id: string;
    name: string;
    type: TypeAdmin;
    username?: string;
    password?: string;
    uid: string
    key?: string;
    phone: string;
    status: boolean | true;
    sucursal?: string;
}
export enum TypeAdmin {
    Admin = "ADMIN",
    Customer = "CUSTOMER",
    Delivery = "DELIVERY"
}