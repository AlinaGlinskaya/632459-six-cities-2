import { LoggerInterface } from './logger.interface.js';

export default class ConsoleLoggerService implements LoggerInterface {
  public info(message: string, ...args: unknown[]) {
    console.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]) {
    console.warn(message, ...args);
  }

  public error(message: string, ...args: unknown[]) {
    console.error(message, ...args);
  }

  public debug(message: string, ...args: unknown[]) {
    console.debug(message, ...args);
  }
}
