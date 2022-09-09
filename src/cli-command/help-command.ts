import { CliCommandInterface } from './cli-command.interface.js';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
      Программа для подготовки данных для REST API сервера.

      Пример вызова команды:
        main.js --<command> [--arguments]

      Команды:
        --help:                       ## команда по умолчанию, выводит данное сообщение
        --version:                    ## выводит номер версии
        --import <path>:              ## импортирует данные из TSV
        --generator <n> <path> <url>  ## генерирует указанное количество тестовых данных
    `);
  }
}
