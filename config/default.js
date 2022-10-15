require('dotenv').config();
const path = require('path');

module.exports = {
  auth: {
    jwtSecret: 'TOP_SECRET',
    issuer: 'pleo.io',
    audience: 'amazing-api.pleo.io',
  },
  db: {
    host: '0.0.0.0',
    port: 5432,
    database: 'challenge',
    user: 'example',
    password: 'example',
  },
  debug: {
    stackSize: 4,
  },
  i18next: {
    translationFilePath: path.resolve(__dirname, '..', 'locales/{{lng}}/{{ns}}.json'),
  },
  host: 'localhost:9001',
  https: {
    enabled: false,
  },
  port: process.env.PORT || 9001,
  shutdown: {
    appKill: 1000,
    serverClose: 100,
  },
};
