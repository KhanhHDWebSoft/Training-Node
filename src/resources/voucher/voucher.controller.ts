import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/voucher/voucher.validation';
import VoucherService from '@/resources/voucher/voucher.service';
import VoucherCodeGenerator from 'voucher-code-generator';
import EventModel from '@/resources/event/event.model';
import { EventType } from '../event/event.interface';

class VoucherController implements Controller {
    public path = '/vouchers';
    public router = Router();
    private eventModel = EventModel;
    private VoucherService = new VoucherService();

    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/`,
            validationMiddleware(validate.create),
            this.create
        );
    }
    private async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { eventId } = req.body;
            this.eventModel.findById(
                eventId,
                async (err: any, event: EventType) => {
                    if (err) {
                        next(new HttpException(456, 'Cannot Create Voucher'));
                    }

                    if (event && event.totalVoucher < 10) {
                        let code: string[] = VoucherCodeGenerator.generate({
                            length: 6,
                            count: 1,
                        });
                        const voucher = await this.VoucherService.create(
                            code[0],
                            eventId
                        );

                        res.status(201).json({ voucher });
                    }
                }
            );
        } catch (e) {
            next(new HttpException(456, 'Cannot create voucher'));
        }
    }
}

export default VoucherController;
