const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

module.exports = {
  options: {
    port: process.env.PORT || 3000,
    logs: {
      console: true,
      consoleJSON: process.env.NODE_ENV === 'production',
      consoleColor: process.env.NODE_ENV !== 'production',
      consoleLevel: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      app: process.env.LOGS === 'true',
      error: process.env.LOGS === 'true',
    },
    session: {
      ttl: 900,
      secret: process.env.SESSION_SECRET,
      cookieName: 'kbridh-app',
    },
    redis: {
      connectionString: process.env.REDIS_TLS_URL || process.env.REDIS_URL,
    },
    views: [
      path.resolve(
        path.dirname(require.resolve('@kbridenhaag/kbridh-emails')),
        'components'
      ),
      'views',
    ],
    translation: {
      fallbackLang: ['id'],
      cookie: {
        name: 'kbridh-lang',
      },
    },
    addressLookup: {
      url: process.env.POSTCODE_API_URL,
      apiKey: process.env.POSTCODE_API_KEY,
      concatenateExtension: true,
    },
    emailer: {
      from: 'no-reply@indonesia.nl',
      transport: 'smtp',
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE === 'true' ? true : false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
    },
    s3: {
      region: process.env.S3_REGION,
      bucket: process.env.S3_BUCKET,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    },
    sheetId: process.env.SHEET_ID,
    serviceAccount: {
      email: process.env.SERVICE_ACCOUNT_EMAIL,
      privateKey: process.env.SERVICE_ACCOUNT_PRIVATE_KEY,
    },
    auth: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    },
    url: process.env.URL,
  },
};
