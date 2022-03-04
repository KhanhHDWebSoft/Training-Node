import { Document } from 'mongoose';

export default interface Voucher extends Document {
    code: string;
    value: string;
}
