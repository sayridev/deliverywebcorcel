export interface IProduct {
    id?: string;
    name: string;
    category: string
    price: number;
    image?: string;
    description: string;
    key?: string;
    status: boolean | true;
}