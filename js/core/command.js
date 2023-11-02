import about from '../commands/about.js';
import project from '../commands/project.js';
import ls from '../commands/ls.js';
import cd from '../commands/cd.js';
// This will be our base set of commands that are available globally.
const universalCommands = [
  {
    name: 'help',
    description: 'Displays a list of available commands',
    execute: displayHelp,
  },
  {
    name: 'exit',
    description: 'Exits the current session or command context',
    execute: handleExit,
  },
];

const globalCommands = [about, project, ls, cd];
let currentCommands = [...globalCommands, ...universalCommands];
const commandContextStack = []; // Used to keep track of our current context

function displayHelp() {
  let output = 'Available commands:\n';
  let longestNameLength = 0;
  for (const command of currentCommands) {
    if (command.name.length > longestNameLength) {
      longestNameLength = command.name.length;
    }
  }
  // Construct the help text
  for (const command of currentCommands) {
    const paddingSpaces = ' '.repeat(longestNameLength - command.name.length);
    output += `  ${command.name}${paddingSpaces} - ${command.description}\n`;
  }
  return output;
}

function handleExit() {
  if (commandContextStack.length > 0) {
    commandContextStack.pop();
    // Reset to global commands if no context remains, else reset to the commands of the last context.
    if (commandContextStack.length === 0) {
      currentCommands = [...globalCommands, ...universalCommands];
      return 'Exited to global context.';
    } else {
      const lastContextCommand = globalCommands.find(
          (cmd) =>
            cmd.name === commandContextStack[commandContextStack.length - 1],
      );
      currentCommands = [...lastContextCommand.commands, ...universalCommands]; // Allow access to the universal commands in sub-contexts too.
      return `Returned to ${
        commandContextStack[commandContextStack.length - 1]
      } context.`;
    }
  } else {
    return 'Already in the global context.';
  }
}

async function executeCommand(commandName, args = [], callback) {
  const command = currentCommands.find((cmd) => cmd.name === commandName);
  if (command) {
    if (command.commands) {
      // If the command has subcommands
      commandContextStack.push(commandName);
      currentCommands = [...command.commands, ...universalCommands];
    }
    let result = command.execute(args);
    if (result instanceof Promise) {
      result = await result;
    }
    return result;
  } else {
    return `Unknown command: ${commandName}. Type "help" for a list of commands.`
  }
}

export {executeCommand, currentCommands};
