const fs = require('fs');
const path = require('path');
const dirTree = require('directory-tree');

const outputFilePath = 'filesystem/filesystem.json'; // Adjust the output path as needed

// Create a JSON representation of the directory
const tree = dirTree('filesystem/root', {attributes: ['type']}, (item, PATH, stats) => {
  // Here you can modify each item (for example, add a 'type' property)
  item.type = stats.isDirectory() ? 'directory' : 'file';
});

// Write the JSON to a file
fs.writeFileSync(outputFilePath, JSON.stringify(tree, null, 2));

console.log(`Filesystem JSON generated at ${outputFilePath}`);
