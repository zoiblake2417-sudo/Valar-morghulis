require('dotenv').config();
const express = require('express');
const cors = require('cors');
const aiEngine = require('./aiEngine');
const fileGenerator = require('./fileGenerator');
const githubPush = require('./githubPush');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Jarvis AI System Running 🚀');
});

app.get('/test', (req, res) => {
    res.json({ message: 'System working' });
});

app.get('/generate', async (req, res) => {
    const prompt = req.query.prompt;
    if (!prompt) {
        return res.status(400).json({ error: 'Missing prompt query parameter' });
    }

    return handleGenerate(prompt, res);
});

app.post('/generate-app', async (req, res) => {
    const prompt = req.body.prompt;
    if (!prompt) {
        return res.status(400).json({ error: 'Missing prompt in request body' });
    }

    return handleGenerate(prompt, res);
});

async function handleGenerate(prompt, res) {
    try {
        console.log('Received prompt:', prompt);
        const generatedApp = await aiEngine.generateApp(prompt);
        console.log('Generating app');
        const localPath = await fileGenerator.generateFiles(generatedApp);
        console.log('Saving files');
        const githubResult = await githubPush.pushToGitHub(generatedApp.files, generatedApp.project_name, prompt);
        console.log('Pushing to GitHub');

        return res.json({
            status: 'success',
            project_name: generatedApp.project_name,
            localPath,
            github: githubResult,
        });
    } catch (error) {
        console.error('Generate error:', error);
        return res.status(500).json({ error: error.message || 'Failed to generate app' });
    }
}

app.listen(PORT, HOST, () => {
    console.log(`Server running on ${HOST}:${PORT}`);
});