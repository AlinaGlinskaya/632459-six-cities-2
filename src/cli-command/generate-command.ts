import { CliCommandInterface } from './cli-command.interface.js';
import { appendFile } from 'fs/promises';
import got from 'got';
import { MockData } from '../types/mock-data.type.js';
import OfferGenerator from '../common/offer-generator/offer-generator.js';
import chalk from 'chalk';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';

  private initialData!: MockData;

  public async execute(...args: string[]): Promise<void> {
    const [count, filepath, url] = args;
    const offerCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      return console.log(chalk.red(`Не удалось загрузить данные ресурса ${url}.`));
    }

    const offerGeneratedString = new OfferGenerator(this.initialData);

    for (let i = 0; i < offerCount; i++) {
      await appendFile(filepath, `${offerGeneratedString.generate()}\n`, 'utf-8');
    }

    console.log(chalk.green(`Файл ${filepath} создан.`));
  }


}
