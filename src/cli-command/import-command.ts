import { CliCommandInterface } from './cli-command.interface.js';
import { createOffer, getErrorMessage } from '../utils/common.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import chalk from 'chalk';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import { UserServiceInterface } from '../modules/user/user-service.interface.js';
import { OfferServiceInterface } from '../modules/offer/offer-service.interface.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import DatabaseService from '../common/database-client/database.service.js';
import UserService from '../modules/user/user.service.js';
import { UserModel } from '../modules/user/user.entity.js';
import OfferService from '../modules/offer/offer.service.js';
import { OfferModel } from '../modules/offer/offer.entity.js';
import { Offer } from '../types/offer.type.js';
import { getURI } from '../utils/db.js';

const DEFAULT_DB_PORT = 27017;
const DEFAULT_USER_PASSWORD = 'qwerty';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private logger!: LoggerInterface;
  private salt!: string;
  private databaseService!: DatabaseInterface;
  private userService!: UserServiceInterface;
  private offerService!: OfferServiceInterface;

  constructor() {
    this.onLineCompleted = this.onLineCompleted.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.databaseService = new DatabaseService(this.logger);
    this.userService = new UserService(this.logger, UserModel);
    this.offerService = new OfferService(this.logger, OfferModel);
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({...offer, authorId: user.id});
  }

  private async onLineCompleted(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onComplete(count: number) {
    console.log(chalk.green(`Импортировано строк: ${count}`));
    this.databaseService.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseService.connect(uri);
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('lineCompleted', this.onLineCompleted);
    fileReader.on('end', this.onComplete);

    try {
      fileReader.read();
    } catch (err) {
      console.log(chalk.red(`Не удалось прочитать файл: ${getErrorMessage(err)}`));
    }
  }
}
