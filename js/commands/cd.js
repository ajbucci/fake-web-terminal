const dirSpan = document.getElementById('dir');

export default {
  name: 'cd',
  description: 'change directories',
  execute: cd,
}

const rootDirectory = "js/filesystem/"
let currentDirectory = rootDirectory;

async function cd(path) {
  if (path[0] === "..") {
      // Handle moving up a directory
      let parts = currentDirectory.split('/').filter(part => part !== '');
      parts.pop();
      currentDirectory = parts.join('/') + '/';
  } else {
      currentDirectory += path[0] + (path[0].endsWith('/') ? '' : '/');
  }

  try {
      const response = await fetch(currentDirectory);

      if (!response.ok) {
          throw new Error(`Failed to change directory: ${response.statusText}`);
      }

      const content = await response.text();

      if (content.includes('<!DOCTYPE HTML>')) {
          // Update dirSpan to only show the current folder
          let displayedDirectory = currentDirectory.split('/').filter(part => part !== '').pop();
          if (currentDirectory === rootDirectory) {
            displayedDirectory = "~";
          }
          dirSpan.textContent = displayedDirectory; // Show '~' if in the root directory
          return `Changed to ${displayedDirectory}`;
      } else {
          throw new Error(`cd: ${path}: No such directory`);
      }
  } catch (error) {
      return error.message;
  }
}
