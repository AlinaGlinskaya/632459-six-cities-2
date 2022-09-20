import { CliCommandInterface } from './cli-command.interface.js';
import { createOffer, getErrorMessage } from '../utils/common.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import chalk from 'chalk';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  private onLineCompleted(line: string) {
    const offer = createOffer(line);
    console.log(offer);
  }

  private onComplete(count: number) {
    console.log(chalk.green(`Импортировано строк: ${count}`));
  }

  public execute(filename: string): void {
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
