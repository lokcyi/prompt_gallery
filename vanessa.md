# 建立一個網站 可以 review 目錄中的所有 md 檔

Let me help you create a website to review the MD files in the directory. I'll first check what technology stacks and frameworks might already be in use.I'll help you create a website to review the MD files in the directory. Let me first create a simple web application that can display and navigate through the markdown files.

Let me first create an index.html and necessary files to set up the basic structure.
````
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Gallery</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css/github-markdown.min.css">
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <style>
        .sidebar {
            height: 100vh;
            overflow-y: auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .content {
            height: 100vh;
            overflow-y: auto;
            padding: 20px;
        }
        .file-list {
            list-style: none;
            padding: 0;
        }
        .file-list li {
            padding: 5px 0;
            cursor: pointer;
        }
        .file-list li:hover {
            color: #0d6efd;
        }
    </style>
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3 sidebar">
                <h3>Files</h3>
                <div id="fileTree"></div>
            </div>
            <div class="col-md-9 content">
                <div id="content" class="markdown-body"></div>
            </div>
        </div>
    </div>

    <script>
        function loadFile(path) {
            fetch(path)
                .then(response => response.text())
                .then(text => {
                    document.getElementById('content').innerHTML = marked.parse(text);
                });
        }

        function buildFileTree() {
            fetch('files.json')
                .then(response => response.json())
                .then(files => {
                    const fileTree = document.getElementById('fileTree');
                    const ul = document.createElement('ul');
                    ul.className = 'file-list';
                    
                    files.forEach(file => {
                        const li = document.createElement('li');
                        li.textContent = file;
                        li.onclick = () => loadFile(file);
                        ul.appendChild(li);
                    });
                    
                    fileTree.appendChild(ul);
                });
        }

        buildFileTree();
    </script>
</body>
</html>
````


Made changes.

Now I'll create a simple Node.js script to generate the files.json that will contain the list of all markdown files in the directory.
````
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
````


Made changes.

Now let's run the Node.js script to generate the files.json:I've created a simple web application to review the markdown files. The setup includes:

1. An index.html file with a responsive layout that has:
   - A sidebar to display the file list
   - A main content area to display markdown content
   - Bootstrap for styling
   - Marked.js for markdown rendering
   - GitHub markdown CSS for proper markdown styling

2. A generate-file-list.js script that scans the directory for markdown files and creates a files.json

To use the website:

1. First run the Node.js script to generate the file list:
```
node generate-file-list.js
```

2. Then you'll need to serve the files using a local web server. You can use any web server, for example Python's built-in server:
```
python -m http.server
```

Or if you prefer Node.js:
```
npx http-server
```

Would you like me to implement any particular web server solution for serving the files, or would you like any modifications to the current implementation?