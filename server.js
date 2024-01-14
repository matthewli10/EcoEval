const express = require('express');
const app = express();
const port = 3000;
const { OpenAI } = require("openai");

app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

function extractIngredients(text) {
    // Isolating SECTION 1
    let section1 = text.split("SECTION 2:")[0];
  
    // Splitting by lines and extracting ingredient names
    let lines = section1.split('\n');
    let ingredients = [];
    for (let line of lines) {
        let match = line.match(/\d+\.\s(.*?):/);
        if (match) {
            ingredients.push(match[1].trim());
        }
    }
    return ingredients;
  }
  
  
  function extractIngredientDetails(text) {
    // Isolating SECTION 1
    let section1 = text.split("SECTION 2:")[0];
  
    // Splitting by lines and extracting details for each ingredient
    let lines = section1.split('\n');
    let ingredientDetails = [];
    for (let line of lines) {
        let match = line.match(/^(\d+\.\s)(.*?):\s(.*?)(?:\.|\n|$)/);
        if (match && match.length === 4) {
            // Pushing only the detail (third capture group) into the array
            ingredientDetails.push(match[3].trim());
        }
    }
    return ingredientDetails;
  }
  
  function extractCompanyInfo(text) {
    // Regular expression to match the company information
    let match = text.match(/SECTION 2:\n(.*?)\./s);
  
    // If a match is found, return the matched group, else return an empty string
    return match ? match[1].trim() : "";
  }
  
  function extractProductGrade(text) {
    // Splitting the text at "SECTION 3:"
    let section3 = text.split("SECTION 3:")[1];
  
    if (section3) {
        // Regular expression to match the grade letter (A, B, C, D, or F)
        let match = section3.match(/\s(A|B|C|D|F)\s/);
  
        // If a match is found, return the matched grade letter without spaces
        return match ? match[1] : "";
    }
    return "";
  }
  

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
            max_tokens: maxTokens,
            temperature: 0.2
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
