import winston from 'winston';
import 'winston-mongodb';
import config from '../config/test.json';

export default function initializeLogging() {
  const db = config.db as string;
  const logger = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    ]
  });
  
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
  
  logger.add(new winston.transports.File({ filename: 'logfile.log' }));
  
  logger.add(new winston.transports.MongoDB({
    db: db,
    level: 'info'
  }));
}