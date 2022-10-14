import config from 'config';
import context from './middleware/context';
import gracefulShutdown from '@nc/utils/graceful-shutdown';
import helmet from 'helmet';
import Logger from '@nc/utils/logging';
import Router from './routes';
import security from './middleware/security';

import { createServer as createHTTPServer, Server } from 'http';
import { createServer as createHTTPSServer, Server as SecureServer } from 'https';
import express, { Application } from 'express';

const app: Application = express();

const logger = Logger('server');

const server: Server | SecureServer = (config.https.enabled === true) ? createHTTPSServer(config.https, app as any) : createHTTPServer(app as any);

gracefulShutdown(server);

app.use(helmet());
app.use(context);
app.use(security);

app.use('/api/', Router);

// eslint-disable-next-line
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// eslint-disable-next-line
app.use((err, req, res, next) => {
  res.status(err.status).json({ error: err.message });
});

server.listen(config.port, () => {
  logger.log(`Server started on port ${config.port}`);
});

export default server;
