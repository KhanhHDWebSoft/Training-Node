import VoucherModel from './voucher.model';
import Voucher from './voucher.interface';

class VoucherService {
    private voucher = VoucherModel;

    // create a new voucher
    public async create(code: string, eventId: string): Promise<Voucher> {
        try {
            const voucher = await this.voucher.create({ code, eventId });

            return voucher;
        } catch (error) {
            throw new Error('Unable to create voucher');
        }
    }
}

export default VoucherService;
