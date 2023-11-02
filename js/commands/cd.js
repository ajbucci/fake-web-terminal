import FileSystem from '/js/core/filesystem.js';
const dirSpan = document.getElementById('dir');

function cd(path) {
    const newPath = FileSystem.navigatePath(path[0]);

    if (FileSystem.isDirectory(newPath)) {
        // Update dirSpan to only show the current folder
        let displayedDirectory = newPath.split('/').filter(part => part !== '').pop();
        if (newPath === FileSystem.rootPath) {
            displayedDirectory = "~";
        }
        dirSpan.textContent = displayedDirectory;
        FileSystem.fileSystemState.currentPath = newPath;
        return `Changed to ${displayedDirectory}`;
    } else {
        return `cd: ${path}: No such directory`;
    }
}

export default {
    name: 'cd',
    description: 'change directories',
    execute: cd,
}
