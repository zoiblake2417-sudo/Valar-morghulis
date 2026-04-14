const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to build-a-todo-app! App generated from prompt: build a todo app');
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    project: 'build-a-todo-app',
    prompt: 'build a todo app'
  });
});

app.post('/api/message', (req, res) => {
  const { message } = req.body || {};
  res.json({
    reply: message
      ? 'Echo: ' + message
      : 'Send a JSON body with { "message": "..." }',
    prompt: 'build a todo app'
  });
});

app.listen(PORT, HOST, () => {
  console.log('Server running on ' + HOST + ':' + PORT);
});
