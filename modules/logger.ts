import winston from 'winston';

const apiLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'api-service' },
  transports: [
    new winston.transports.File({ filename: 'api.error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

const discordLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'discord-service' },
  transports: [
    new winston.transports.File({ filename: 'discord.error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

const redisLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'redis-service' },
  transports: [
    new winston.transports.File({ filename: 'redis.error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export { apiLogger, discordLogger, redisLogger };