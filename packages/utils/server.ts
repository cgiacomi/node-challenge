import { Application } from 'express';
import { createServer as createHTTPSServer } from 'https';
import gracefulShutdown from './graceful-shutdown';

import { createServer as createHTTPServer, Server } from 'http';

export interface HttpsOptions {
  enabled: boolean
  key?: Buffer
  cert?: Buffer
}

export const createServer = (app: Application, https: HttpsOptions): Server => {
  let server: Server;

  if (https.enabled === true) {
    server = createHTTPSServer(https, app as any);
  } else {
    server = createHTTPServer(app as any);
  }

  gracefulShutdown(server);

  return server;
};
