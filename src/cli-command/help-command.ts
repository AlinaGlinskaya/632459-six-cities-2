import { CliCommandInterface } from './cli-command.interface.js';
import chalk from 'chalk';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
      ${chalk.white.bgGreen.bold('Программа для подготовки данных для REST API сервера.')}

      ${chalk.green('Пример вызова команды:')}
        ${chalk.yellow('main.js')} ${chalk.blue('--<command> [--arguments]')}

      ${chalk.green('Команды:')}
        ${chalk.blue('--help:')}                       ## команда по умолчанию, выводит данное сообщение
        ${chalk.blue('--version:')}                    ## выводит номер версии
        ${chalk.blue('--import <path>:')}              ## импортирует данные из TSV
        ${chalk.blue('--generate <n> <path> <url>')}  ## генерирует указанное количество тестовых данных
    `);
  }
}
