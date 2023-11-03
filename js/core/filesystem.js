let fileSystemData = null;

const rootPath = '/';
const homeAliasRE = /^~\/?/i;
const absolutePrefix = '/';

let fileSystemState = {
  networkPrefix: null,
  currentPath: null,
}
async function loadFileSystem() {
  const response = await fetch(window.location.pathname + 'filesystem/filesystem.json');
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

function getAbsolutePath(path) {
  // Replace the home alias with the root '/'
  let newPath = path.replace(homeAliasRE, '/');
  const isPathRelative = newPath[0] !== absolutePrefix;

  // If the path is relative, prepend the current directory path
  if (isPathRelative) {
    newPath = fileSystemState.currentPath + '/' + newPath;
  }

  // Normalize the path to resolve '..' and '.'
  // Split the path into parts, filter out any empty parts or '.',
  // and process '..' by removing the preceding part
  const pathParts = newPath.split('/').reduce((parts, part) => {
    if (part === '..') {
      parts.pop(); // Go up one directory (remove the last part)
    } else if (part !== '' && part !== '.') {
      parts.push(part); // Add the part to the path
    }
    return parts;
  }, []);

  // Join the parts back into a normalized path
  return '/' + pathParts.join('/');
}


export default {
    fileSystemState,
    rootPath,
    getAbsolutePath,
    isDirectory,
    getDirectory
};
