export interface IUser {
    id: number;
    username: string;
    email: string;
    deviceId: string;
    accountType: string;
    fullName: string;
    phoneNumber: string;
    role: string | null;
    active: boolean;
}

export interface MissedPrayer {
    id: number | null;
    prayerType: string;
    totalCount: number ;
    completedCount: number;
    remainingCount: number;
}

export interface Prayer {
    id: number;
    missedPrayerId: number;
    count: number;
}

export interface Booking {
    id: number;
    fieldId: number;
    date : number;
    startTime: string;
    endTime: string;
    time: string;
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

