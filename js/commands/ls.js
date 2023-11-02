import FileSystem from '/js/core/filesystem.js';

export default {
  name: 'ls',
  description: 'list directories',
  execute: ls,
}

function ls() {
  const currentPath = FileSystem.fileSystemState.currentDirectory;

  const currentDirObject = FileSystem.getDirectory(currentPath);

  if (!currentDirObject || !currentDirObject.children) {
      return "No files or directories here.";
  }

  return currentDirObject.children.map(child => child.name).join('  ');
}