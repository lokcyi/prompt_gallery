const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const { marked } = require('marked');

const app = express();
const PORT = process.env.PORT || 5000;
const PROMPT_GALLERY_DIR = path.resolve(__dirname, '../../prompt_gallery/');

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to read MD files and extract title, description, and code
const processMarkdownFile = (filePath) => {
  console.log(`-----Processing file: ${filePath}`); // Debug log
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const filePathRelative = path.relative(PROMPT_GALLERY_DIR, filePath).replace(/\\/g, '/');
    
    // Extract title from filename or first heading
    let title = path.basename(filePath, '.md').replace(/_/g, ' ');
    const titleMatch = content.match(/^# (.*)$/m);
    if (titleMatch) {
      title = titleMatch[1];
    }
    
    // Extract description from the second section/paragraph if available
    let description = '';
    const descMatch = content.match(/^## 說明$\n([\s\S]*?)(?=^##|\n$)/m) || 
                      content.match(/^## 설명$\n([\s\S]*?)(?=^##|\n$)/m) || 
                      content.match(/^## Description$\n([\s\S]*?)(?=^##|\n$)/m);
    
    if (descMatch && descMatch[1]) {
      description = descMatch[1].trim();
    }
    
    // Get category from directory name
    const category = path.dirname(filePathRelative) !== '.' ? path.dirname(filePathRelative) : 'General';
    
    return {
      title,
      description: description || 'No description available.',
      path: filePathRelative,
      category,
      code: content
    };
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return null;
  }
};

// Get directory structure
app.get('/api/directory', (req, res) => {
  try {
    const directories = [];
    console.log(`----Reading directory: ${PROMPT_GALLERY_DIR}`); // Debug log
    // Get immediate subdirectories
    const items = fs.readdirSync(PROMPT_GALLERY_DIR);
    
    items.forEach(item => {
      const itemPath = path.join(PROMPT_GALLERY_DIR, item);
      const stats = fs.statSync(itemPath);
      // console.log(`---Reading sub directory: ${itemPath}`,stats.isDirectory()); // Debug log
      if (stats.isDirectory()) {
        // Get MD files in this directory
        console.log(`--- > `,path.join(itemPath, '*.*')); // Debug log

        // const mdFiles = glob.sync(path.join(itemPath, '*.md'));
        //const mdFiles = glob.sync(path.join(itemPath, '*.*'));
        const mdFiles = glob.sync('../../prompt_gallery/'+item+'/*.*')
        console.log(item,mdFiles) // Debug log


        const children = mdFiles.map(file => {
          const processedFile = processMarkdownFile(file);
          return {
            name: processedFile.title,
            path: processedFile.path,
            description: processedFile.description,
            isDirectory: false
          };
        });
        
        if (children.length === 0) {
          const subDirs = fs.readdirSync(itemPath).filter(subItem => fs.statSync(path.join(itemPath, subItem)).isDirectory());
          subDirs.forEach(subDir => {
            const subDirPath = path.join(itemPath, subDir);
            const subDirMdFiles = glob.sync(path.join(subDirPath, '**/*.md'));
            const subDirChildren = subDirMdFiles.map(file => {
              const processedFile = processMarkdownFile(file);
              return {
                name: processedFile.title,
                path: processedFile.path,
                description: processedFile.description,
                isDirectory: false
              };
            });
            children.push(...subDirChildren);
          });
        }
        
        directories.push({
          name: item,
          path: item,
          isDirectory: true,
          children
        });
      } else if (stats.isFile() && path.extname(item) === '.md') {
        // Include top-level MD files
        directories.push({
          name: path.basename(item, '.md').replace(/_/g, ' '),
          path: item,
          isDirectory: false
        });
      }
    });
    
    res.json(directories);
  } catch (error) {
    console.error('Error reading directory structure:', error);
    res.status(500).json({ error: 'Failed to read directory structure' });
  }
});

// Get all prompts
app.get('/api/prompts', (req, res) => {
  try {
    // Find all markdown files
    //const mdFiles = glob.sync(path.join(PROMPT_GALLERY_DIR, '**/*.md'));
    //'../../prompt_gallery/'+item+'/*.*')
    const mdFiles = glob.sync('../../prompt_gallery/**/*.*');
    // Process each file
    const prompts = mdFiles
      .map(processMarkdownFile)
      .filter(Boolean); // Filter out nulls from errors
    
    res.json(prompts);
  } catch (error) {
    console.error('Error getting prompts:', error);
    res.status(500).json({ error: 'Failed to get prompts' });
  }
});

// Get a single prompt by path
app.get('/api/prompt', (req, res) => {
  try {
    const promptPath = req.query.path;
    console.log(`Requested prompt path: ${promptPath}`); // Debug log
    if (!promptPath) {
      return res.status(400).json({ error: 'No path provided' });
    }
    
    const fullPath = path.join(PROMPT_GALLERY_DIR, promptPath);
    console.log(`Full path to prompt: ${fullPath}`); // Debug log
    
    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ error: 'Prompt not found' });
    }
    
    const prompt = processMarkdownFile(fullPath);
    if (!prompt) {
      return res.status(500).json({ error: 'Failed to process prompt file' });
    }
    
    res.json(prompt);
  } catch (error) {
    console.error('Error getting prompt:', error);
    res.status(500).json({ error: 'Failed to get prompt' });
  }
});

// Serve static files from the Vue build directory in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Trying another port...`);
    const newPort = PORT + 1;
    server.listen(newPort, () => {
      console.log(`Server running on port ${newPort}`);
    });
  } else {
    throw err;
  }
});