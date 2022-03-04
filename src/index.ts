import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import VoucherController from '@/resources/voucher/voucher.controller';

validateEnv();

const app = new App([new VoucherController()], Number(process.env.PORT));

app.listen();
