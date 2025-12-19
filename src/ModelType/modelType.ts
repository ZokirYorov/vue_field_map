
export interface Booking {
    id: number;
    fieldId: number;
    date : number;
    startTime: string;
    endTime: string;
    status : string;
    paymentType: string | null;
    paid: boolean
}
export interface Field {
    id: number;
    name: string;
    price: number;
    sports: string;
    surface: string;
    city: string;
    lat: number;
    lng: number;
    image: string;
    address: string;
    workTime: string
}

