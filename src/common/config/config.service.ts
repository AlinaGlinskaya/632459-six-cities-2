import { ConfigInterface } from './config.interface.js';
import {DotenvParseOutput, config} from 'dotenv';
import { LoggerInterface } from '../logger/logger.interface.js';

export default class ConfigService implements ConfigInterface {
  private config: DotenvParseOutput;
  private logger: LoggerInterface;

  constructor(logger: LoggerInterface) {
    this.logger = logger;

    const parsedOutput = config({path: '.env.example'});

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps this file does not exists');
    }

    this.config = <DotenvParseOutput>parsedOutput.parsed;
    this.logger.info('env file successfully parsed.');

  }

  public get(key: string): string | undefined {
    return this.config[key];
  }
}
