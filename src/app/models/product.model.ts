export class Product {
    id?: string;
    city: string;
    onAir: boolean;
    pictureLink: string;
    releaseDate: string;
    title: string;
    description: string
    price : number;

    constructor() {
        this.city = '';
        this.onAir = false;
        this.pictureLink = '';
        this.releaseDate = '';
        this.title = '';
        this.description = '';
        this.price = 0;
    }
}
