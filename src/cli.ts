import CLIApplication from './app/cli-application.js';
import VersionCommand from './cli-command/version-command.js';
import HelpCommand from './cli-command/help-command.js';

const myManager = new CLIApplication();
myManager.registerCommands([
  new VersionCommand, new HelpCommand
]);
myManager.processCommand(process.argv);

