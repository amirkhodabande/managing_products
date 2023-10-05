import { format, createLogger, transports } from 'winston';

const { combine, timestamp, metadata, printf } = format;

const customFormat = printf(({ level, message, metadata, timestamp }) => {
  return `${timestamp} ${level}: ${message} \n detail: ${JSON.stringify(metadata)}`;
});

export default createLogger({
    level: "debug",
    format: combine(metadata(), timestamp(), customFormat),
    transports: [
        new transports.Console({ level: 'error'}),
        new transports.File({ filename: './storage/logs/app.log'})
    ]
});