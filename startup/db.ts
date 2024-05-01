import winston from 'winston';
import mongoose from 'mongoose';
import config from '../config/test.json';

export default function initializeDB() {
  const db = config.db as string;

  winston.add(new winston.transports.Console({
    format: winston.format.simple(),
    level: 'info' 
  }));

  mongoose.connect(db)
    .then(() => winston.info(`Connected to ${db}...`))
    .catch(err => winston.error('Could not connect to MongoDB...', err));
}