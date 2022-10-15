import context from './middleware/context';
import { router as healthRoutes } from '@nc/domain-health';
import helmet from 'helmet';
import { IConfig } from 'config';
import Router from './routes';
import security from './middleware/security';

import { authenticatedRoute, AuthOptions, configureAuthStrategy } from './auth/auth';
import express, { Application } from 'express';

export class App {
  private app: Application;

  constructor(config: IConfig) {
    this.app = express();

    const authOptions: AuthOptions = config.get('auth');
    configureAuthStrategy(authOptions);
  }

  initialize() {
    this.app.use(helmet());
    this.app.use(context);
    this.app.use(security);

    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.app.use('/healthcheck', healthRoutes);

    this.app.use('/api/', authenticatedRoute({ session: false }), Router);
    // this.app.use('/api/', Router); // Uncomment to remove the required authentication for the routes. (this is here for demo purposes simply for the challenge)

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
