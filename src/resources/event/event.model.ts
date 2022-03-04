import { Schema, model } from 'mongoose';
import { Event } from '@/resources/event/event.interface';

const EventSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        totalVoucher: {
            type: Number,
            required: true,
        },
        isRelease: {
            type: Boolean,
        },
    },
    { timestamps: true }
);

export default model<Event>('Event', EventSchema);
