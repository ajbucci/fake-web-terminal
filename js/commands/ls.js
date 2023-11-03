import FileSystem from '../core/filesystem.js';

export default {
  name: 'ls',
  description: 'list directory contents',
  execute: ls,
  allowsHtml: true,
}

function ls(path) {
  if (path.length === 0) {
    path = [FileSystem.fileSystemState.currentPath];
  }
  const currentPath = FileSystem.getAbsolutePath(path[0]);
  
  const currentDirObject = FileSystem.getDirectory(currentPath);

  if (!currentDirObject || !currentDirObject.children) {
      return "";
  }
  const formattedContents = currentDirObject.children.map(item => {
    const span = document.createElement('span');
    span.textContent = item.name;
    span.className = item.type === 'directory' ? 'lsdir' : 'lsfile';
    return span.outerHTML; // Returns the HTML string of the element
  });

  return formattedContents.join('\n');
}