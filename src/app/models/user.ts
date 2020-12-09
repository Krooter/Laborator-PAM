import { Users } from './users';

export interface User {
    Fullname: string;
    Birthdate: Date;
    Email: string;
    Phone: string;
    Address: string;
    Username: string;
    Password: string;
    Base64Photo: string;
}