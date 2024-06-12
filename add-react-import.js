const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'pages');
const extension = '.tsx';

function addReactImport(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  if (!fileContent.includes("import React from 'react';")) {
    const newContent = `import React from 'react';\n${fileContent}`;
    fs.writeFileSync(filePath, newContent, 'utf8');
  }
}

function traverseDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      traverseDirectory(filePath);
    } else if (path.extname(file) === extension) {
      addReactImport(filePath);
    }
  });
}

traverseDirectory(directoryPath);
console.log('React import added to all files.');
