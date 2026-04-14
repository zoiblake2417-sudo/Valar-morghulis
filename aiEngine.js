const sanitizeProjectName = (prompt) => {
  const cleaned = prompt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 50);

  return cleaned.length ? cleaned : 'jarvis-generated-app';
};

const generatePackageJson = (projectName, prompt) => {
  return JSON.stringify(
    {
      name: projectName,
      version: '1.0.0',
      description: `Generated app from prompt: ${prompt}`,
      main: 'server.js',
      scripts: {
        start: 'node server.js'
      },
      dependencies: {
        express: '^4.18.2',
        cors: '^2.8.5'
      }
    },
    null,
    2
  );
};

const generateServerJs = (projectName, prompt) => {
  return `const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to ${projectName}! App generated from prompt: ${prompt}');
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    project: '${projectName}',
    prompt: '${prompt}'
  });
});

app.post('/api/message', (req, res) => {
  const { message } = req.body || {};
  res.json({
    reply: message
      ? 'Echo: ' + message
      : 'Send a JSON body with { \"message\": \"...\" }',
    prompt: '${prompt}'
  });
});

app.listen(PORT, HOST, () => {
  console.log('Server running on ' + HOST + ':' + PORT);
});
`;
};

const aiEngine = {
  generateApp: async (prompt) => {
    const projectName = sanitizeProjectName(prompt);
    const files = [
      {
        path: 'package.json',
        content: generatePackageJson(projectName, prompt)
      },
      {
        path: 'server.js',
        content: generateServerJs(projectName, prompt)
      }
    ];

    return {
      project_name: projectName,
      files
    };
  }
};

module.exports = aiEngine;
