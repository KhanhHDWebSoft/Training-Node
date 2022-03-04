import { Schema, model } from 'mongoose';
import Voucher from './voucher.interface';

const VoucherSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
        },

        eventId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default model<Voucher>('Voucher', VoucherSchema);
