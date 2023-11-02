import FileSystem from '../core/filesystem.js';

export default {
  name: 'ls',
  description: 'list directory contents',
  execute: ls,
}

function ls() {
  const currentPath = FileSystem.fileSystemState.currentPath;

  const currentDirObject = FileSystem.getDirectory(currentPath);

  if (!currentDirObject || !currentDirObject.children) {
      return "No files or directories here.";
  }

  return currentDirObject.children.map(child => child.name).join('\n');
}