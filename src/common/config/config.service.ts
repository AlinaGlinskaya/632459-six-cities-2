import { ConfigInterface } from './config.interface.js';
import {config} from 'dotenv';
import { LoggerInterface } from '../logger/logger.interface.js';
import { ConfigSchema, configSchema } from './config.schema.js';

export default class ConfigService implements ConfigInterface {
  private config: ConfigSchema;
  private logger: LoggerInterface;

  constructor(logger: LoggerInterface) {
    this.logger = logger;

    const parsedOutput = config({path: '.env.example'});

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps this file does not exists');
    }

    configSchema.load({});
    configSchema.validate({allowed: 'strict', output: this.logger.info});
    this.config = configSchema.getProperties();
    this.logger.info('.env file successfully parsed.');

  }

  public get<T extends keyof ConfigSchema>(key: T): ConfigSchema[T] {
    return this.config[key];
  }
}
