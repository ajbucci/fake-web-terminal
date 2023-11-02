let fileSystemData = null;
let prefixPath = null;
const rootPath = '/';

let fileSystemState = {
  networkPrefix: null,
  currentPath: null,
}
async function loadFileSystem() {
  const response = await fetch('/filesystem/filesystem.json');
  fileSystemData = await response.json();
  fileSystemState.networkPrefix = fileSystemData.path;
  fileSystemState.currentPath = rootPath;
}

loadFileSystem();

// Retrieve the directory object from the file system structure based on the path
function getDirectory(path, currentDir = fileSystemData) {
  // If the path points to the root, return the root directory object
  if (path === rootPath) {
    return fileSystemData;
  }
  // Remove the prefix
  // path = path.replace(new RegExp(`^${prefixPath}/`), "");
  const pathParts = path.split('/').filter(Boolean);

  if (pathParts.length === 0) return currentDir;

  const nextDirName = pathParts.shift();
  const nextDir = (currentDir.children || []).find(child => child.name === nextDirName);

  return nextDir ? getDirectory(pathParts.join('/'), nextDir) : null;
}

// Check if a given path exists in the file system structure
function isDirectory(path) {
  return !!getDirectory(path);
}

function navigatePath(relativePath) {
    let parts = relativePath.split('/').filter(part => part !== '');
    let currentParts = fileSystemState.currentPath.split('/').filter(part => part !== '');

    for (let part of parts) {
        if (part === "..") {
            currentParts.pop();
        } else {
            currentParts.push(part);
        }
    }
    const potentialPath = currentParts.join('/') + '/';
    return isDirectory(potentialPath) ? potentialPath : fileSystemState.currentPath;
}

export default {
    fileSystemState,
    rootPath,
    isDirectory,
    getDirectory,
    navigatePath
};