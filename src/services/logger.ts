import { createLogger, format, transports } from 'winston';
import PrettyError from 'pretty-error';
const pe = new PrettyError();


const myFormat = format.printf(info => {
  return `${info.timestamp} [${info.service}] ${info.level}: ${info.message} ${(info instanceof Error) ? '\n' + pe.render(info) : ''}`;
});


export const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp({ format: 'YYYY/MMM/DD HH:mm:ss:SS' }),
    format.align(),
    format.splat(),
    myFormat,
    format.colorize({ all: true }),
  ),
  defaultMeta: { service: 'NODE-TEMPLATE' },
  transports: [
    new transports.Console()
  ],
});