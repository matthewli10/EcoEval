const express = require('express');
const app = express();
const port = 3000;
const { OpenAI } = require("openai");

app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

app.post('/test-openai', async (req, res) => {
    try {
        const inputText = req.body.text;
        console.log('Received input from extension:', inputText);

        const maxTokens = 250

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", 
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: inputText }
            ],
            max_tokens: maxTokens
        });

        // Log the entire completion object
        console.log('Completion object:', JSON.stringify(completion, null, 2));

        // Check if choices and message content exists
        if (completion && completion.choices && completion.choices[0] && completion.choices[0].message && completion.choices[0].message.content) {
            res.json({ result: completion.choices[0].message.content.trim() });
        } else {
            console.error('Unexpected response structure:', JSON.stringify(completion, null, 2));
            res.status(500).send('Error: Unexpected response structure from OpenAI');
        }

    } catch (error) {
        console.error('Error with OpenAI API:', error.response ? error.response.data : error);
        res.status(500).send('Error processing request');
    }
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
app.get('/', (req, res) => {
    res.send('Server is running!');
});
