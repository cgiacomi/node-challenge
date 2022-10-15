import context from './middleware/context';
import helmet from 'helmet';
import Router from './routes';
import security from './middleware/security';

import express, { Application } from 'express';

export class App {
  private app: Application;

  constructor() {
    this.app = express();
  }

  initialize() {
    this.app.use(helmet());
    this.app.use(context);
    this.app.use(security);

    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.app.use('/api/', Router);

    // eslint-disable-next-line
    this.app.use((req, res, next) => {
      res.status(404).json({ error: 'Not Found' });
    });

    // eslint-disable-next-line
    this.app.use((err, req, res, next) => {
      res.status(err.status).json({ error: err.message });
    });
  }

  getApplication(): Application {
    return this.app;
  }
}
