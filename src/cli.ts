#!/usr/bin/env node

import CLIApplication from './app/cli-application.js';
import VersionCommand from './cli-command/version-command.js';
import HelpCommand from './cli-command/help-command.js';
import ImportCommand from './cli-command/import-command.js';

const myManager = new CLIApplication();
myManager.registerCommands([
  new VersionCommand, new HelpCommand, new ImportCommand
]);
myManager.processCommand(process.argv);

