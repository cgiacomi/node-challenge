import { App } from './app';
import config from 'config';
import Logger from '@nc/utils/logging';

import { createServer, HttpsOptions } from '@nc/utils/server';

const logger = Logger('server');

const httpsOptions: HttpsOptions = config.get('https');
const port: number = config.get('port');

const app = new App();
app.initialize();

const server = createServer(app.getApplication(), httpsOptions);

server.listen(port, () => {
  logger.log(`Server started on port ${port}`);
});

export default server;
