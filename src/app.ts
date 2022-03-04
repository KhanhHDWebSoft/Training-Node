import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import Controller from '@/utils/interfaces/controller.interface';
import errorMiddleware from '@/middleware/error.middleware';
import helmet from 'helmet';
// import { Agenda } from 'agenda';
class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }

    private initialiseMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initialiseErrorHandling(): void {
        this.express.use(errorMiddleware);
    }

    private async initialiseDatabaseConnection(): Promise<void> {
        const { MONGO_PATH } = process.env;

        const db = await mongoose.connect(`${MONGO_PATH}`);

        // test connect agenda
        // new Agenda({
        //     db: {
        //         address: MONGO_PATH as string,
        //         collection: 'notification',
        //     },
        //     processEvery: '40 seconds',
        // });
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log('app running on port ', this.port);
        });
    }
}

export default App;
