const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'pages');
const extension = '.tsx';

function removeDuplicateReactImports(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split('\n');
  const reactImport = "import React from 'react';";

  let importFound = false;
  const newLines = lines.filter((line) => {
    if (line.trim() === reactImport.trim()) {
      if (importFound) {
        return false; // Remove duplicate
      } else {
        importFound = true; // Keep the first occurrence
      }
    }
    return true;
  });

  const newContent = newLines.join('\n');
  fs.writeFileSync(filePath, newContent, 'utf8');
}

function traverseDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      traverseDirectory(filePath);
    } else if (path.extname(file) === extension) {
      removeDuplicateReactImports(filePath);
    }
  });
}

traverseDirectory(directoryPath);
console.log('Duplicate React imports removed from all files.');
