import { CliCommandInterface } from './cli-command.interface.js';
import { Chalk } from 'chalk';

const customChalk = new Chalk({level: 1});

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
        Программа для подготовки данных для REST API сервера.
        Пример: cli.js --<${customChalk.blue('command')}> [${customChalk.green('--arguments')}]
        Команды:
        ${customChalk.green('--version')}:                   ${customChalk.magenta('# выводит номер версии')}
        ${customChalk.green('--help')}:                      ${customChalk.magenta('# печатает этот текст')}
        ${customChalk.green('--import')} <path>:             ${customChalk.magenta('# импортирует данные из TSV')}
        ${customChalk.green('--generate')} <n> <path> <url>  ${customChalk.magenta('# генерирует произвольное количество тестовых данных')}
        `);
  }
}