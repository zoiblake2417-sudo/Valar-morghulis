const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/generate-app', (req, res) => {
    // Logic to generate app based on request body goes here
    res.json({ message: 'App generation in progress...' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});