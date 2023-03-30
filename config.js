const dotenv = require('dotenv');

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
    views: ['views'],
    translation: {
      allowedLangs: ['en', 'id'],
      cookie: {
        name: 'kbridh-lang',
      },
    },
  },
};
