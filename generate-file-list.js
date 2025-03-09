const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllFiles(fullPath, arrayOfFiles);
        } else if (path.extname(file) === '.md') {
            // Get path relative to root directory
            const relativePath = path.relative(__dirname, fullPath);
            arrayOfFiles.push(relativePath.replace(/\\/g, '/'));
        }
    });

    return arrayOfFiles;
}

const files = getAllFiles(__dirname);
fs.writeFileSync('files.json', JSON.stringify(files, null, 2));
console.log('Generated files.json with', files.length, 'markdown files');