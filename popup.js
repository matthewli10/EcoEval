document.getElementById('run-script').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['content.js']
        });
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.scrapedText) {
        console.log("Received data from content script:", message.scrapedText);
        sendDataToServer(message.scrapedText);
    }
});

function sendDataToServer(scrapedText) {
    
    const prompt = "The above list (quoted) is parsed from a webpage of a \
    product. Complete the 3 sections below using this information. \
    LIMIT EACH SECTION ANSWER TO TWO SENTENCES, NOT FULL SENTENCES. \
    BE BRIEF. Analyze the quality of the ingredients/materials used \
    to create this product; based on the known production process, \
    benefits/harmful effects on environment, ethical or sustainable \
    sourcing, recyclability etc. general environmental integrity of \
    the materials: SECTION 1: Select 3 SIGNIFICANT ingredients that \
    are either outstandingly sustainable or outstandingly detrimental \
    to the environment. LIMIT 1 SENTENCE ON WHY FOR EACH INGREDIENT. \
    Use abbreviated sentences and limit to 10 words. Format as \
    ex: '1. Animal Hide: Very bad for the environment'. \
    SECTION 2: Describe the company's environmental \
    reputation and sustainability using web resources to research \
    their reputation. LIMIT 2 SENTENCES. Use abbreviated sentences \
    and limit to 10 words per sentence for this section. SECTION 3: \
    Based on SECTION 1 and 2, generate a grade for the product from \
    A, B, C, D, F, with A being very environmentally sustainable and \
    F being detrimental. Give 1 sentence on why this product received \
    this grade.";

    const promptTokenCount = Math.ceil(prompt.length / 4);
    const maxTokenCount = 4090;
    let remainingTokenCount = maxTokenCount - promptTokenCount - 400;

    if (scrapedText.length > remainingTokenCount * 4) {
        scrapedText = scrapedText.substring(0, remainingTokenCount * 4);
    }

    const textWithPrompt = prompt + ": " + scrapedText;

    fetch('http://localhost:3000/test-openai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textWithPrompt }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from server:', data);
        // Handle the response data
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
