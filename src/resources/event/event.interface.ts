import { Document } from 'mongoose';

export interface Event extends Document {
    name: string;
    totalVoucher: number;
    isRelease: boolean;
}

export interface CreateEventParams {
    name: string;
    totalVoucher: number;
    isRelease: boolean;
}

export interface UpdateEventParams {
    name?: string;
    totalVoucher: number;
    isRelease?: boolean;
}

export interface EventType {
    name: string;
    totalVoucher: number;
    isRelease: boolean;
}
