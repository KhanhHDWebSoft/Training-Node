import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/voucher/voucher.validation';
import EventService from '@/resources/event/event.service';

class VoucherController implements Controller {
    public path = '/events';
    public router = Router();
    private eventService = new EventService();

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
            const { eventName } = req.body;
            const event = await this.eventService.create({
                name: eventName,
                totalVoucher: 0,
                isRelease: false,
            });

            res.status(201).json({ event });
        } catch (e) {
            next(new HttpException(400, 'Cannot create voucher'));
        }
    }
}

export default VoucherController;
