import EventModel from './event.model';
import { Event, CreateEventParams, UpdateEventParams } from './event.interface';

class EventService {
    private event = EventModel;

    // create a new event
    public async create({
        name,
        isRelease,
        totalVoucher,
    }: CreateEventParams): Promise<Event> {
        try {
            const event = await this.event.create({
                name,
                isRelease,
                totalVoucher,
            });

            return event;
        } catch (error) {
            throw new Error('Unable to create voucher');
        }
    }

    // edit event

    public async update({
        name,
        isRelease,
        totalVoucher,
    }: UpdateEventParams): Promise<Event> {
        try {
        } catch (error) {
            throw new Error('Unable to update voucher');
        }
    }
}

export default EventService;
