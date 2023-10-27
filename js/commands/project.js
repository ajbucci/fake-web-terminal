// Function definitions outside of the command object
function displayInfo() {
    return 'This is the project information.';
}

function displayStatus() {
    return 'This project is active.';
}

function manageProject(args) {
    if (!args.length) {
        // If no sub-command is specified, notify the user that they've entered the project context.
        //currentContext.push('project');  // Enter the project context
        return 'Entered project context. Use "info", "status", or "exit" to leave.';
    }
    
    // If there's a sub-command specified
    const subCommand = project.commands.find(cmd => cmd.name === args[0]);
    if (subCommand) {
        return subCommand.execute(args.slice(1));  // Pass remaining args to sub-command
    } else {
        return `Unknown sub-command: ${args[0]}. Try "info" or "status".`;
    }
}

const project = {
    name: 'project',
    description: 'Manage project. Enter this context to access project-related commands.',
    execute: manageProject,
    commands: [  // Using "commands" key here as requested
        {
            name: 'info',
            description: 'Displays project info',
            execute: displayInfo
        },
        {
            name: 'status',
            description: 'Displays project status',
            execute: displayStatus
        }
    ]
};

export default project;
