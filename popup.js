//format
document.addEventListener('DOMContentLoaded', function () {
    
    chrome.storage.local.get('extractedData', function(result) {
        if (result.extractedData) {
            console.log('Retrieved data:', result.extractedData);

            setGrade(result.extractedData.productGrade);
            setIconConditionFromDetails(result.extractedData.ingredientDetails);

            if (result.extractedData.ingredients && result.extractedData.ingredientDetails) {
                for (let i = 0; i < result.extractedData.ingredients.length; i++) {
                    console.log(`Updating UI for ingredient ${i + 1}`);
                    setIngredient(`ingredient${i + 1}`, result.extractedData.ingredients[i]);
                    setMoreContent(`moreContent${i + 1}`, result.extractedData.ingredientDetails[i]);
                }
            }

            setAccordionContent('accordionContent1', result.extractedData.companyInfo);
            setAccordionContent('accordionContent2', result.extractedData.otherOptions);
        }
    });
    
    var readMoreElements = document.querySelectorAll('.read-more');
  
    readMoreElements.forEach(function (readMore) {
      readMore.addEventListener('click', function () {
        var content = this.nextElementSibling;
        if (content.style.display === 'none' || content.style.display === '') {
          content.style.display = 'block';
          this.textContent = 'Read Less';
        } else {
          content.style.display = 'none';
          this.textContent = 'Read More';
        }
        moreContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      });
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    var closeButton = document.getElementById('close-btn');
    closeButton.addEventListener('click', function() {
        window.close(); // This will close the popup window
    });
});

// document.addEventListener('DOMContentLoaded', function() {
//        /* if (some condition){
//         setGrade('A');
//     } */
//     setGrade('D'); // CHANGE GRADE CONDITIONS HERE 
// });

// SET GRADE FUNCTION
function setGrade(newGrade) {
    document.getElementById('grade').textContent = newGrade;
}

function setIcon(id, condition) {
    var iconElement = document.getElementById(id);
    if (condition) {
        iconElement.innerHTML = '<img src="thumbsup.png" alt="Thumbs Up">';
    } else {
        iconElement.innerHTML = '<img src="thumbsdown.png" alt="Thumbs Down">';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Define conditions for each ingredient
    var conditionForIcon1 = true; // Replace with your actual condition for ingredient 1
    var conditionForIcon2 = false; // Replace with your actual condition for ingredient 2
    var conditionForIcon3 = true; // Replace with your actual condition for ingredient 3

    // Set icons based on conditions
    setIcon('icon1', conditionForIcon1);
    setIcon('icon2', conditionForIcon2);
    setIcon('icon3', conditionForIcon3);
});

function setIconConditionFromDetails(ingredientDetails) {
    ingredientDetails.forEach((detail, index) => {
        let condition = detail.startsWith("Sustainable");
        setIcon(`icon${index + 1}`, condition);
    });
}

//setIngredient Function
function setIngredient(ingredientId, ingredientName) {
    console.log(`Setting ingredient ${ingredientId} to ${ingredientName}`);
    var truncatedName = ingredientName.length > 20 ? ingredientName.substring(0, 20) + "..." : ingredientName;
    document.getElementById(ingredientId).textContent = truncatedName;
}
//Example


function setMoreContent(contentId, contentText) {
    document.getElementById(contentId).textContent = contentText;
}

// Example usage:
document.addEventListener('DOMContentLoaded', function() {
    // Define content based on some condition
    var moreContentText1 = 'Detailed content for Ingredient 1 based on some condition.';
    var moreContentText2 = 'Another detailed description for Ingredient 2 after evaluating conditions.';
    var moreContentText3 = 'Further information for Ingredient 3 depending on a different condition.';

    // Set the more content text based on the above variables
    setMoreContent('moreContent1', moreContentText1);
    setMoreContent('moreContent2', moreContentText2);
    setMoreContent('moreContent3', moreContentText3);
});

function setAccordionContent(contentId, newText) {
    var contentElement = document.getElementById(contentId);
    if (contentElement) {
        contentElement.innerHTML = newText;
    } else {
        console.error('Accordion content element not found:', contentId);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Example conditions and content
    var accordionText1 = 'This is content for the first accordion item.';
    var accordionText2 = 'Content for the second accordion item based on a different condition.';

    // Set the content
    setAccordionContent('accordionContent1', accordionText1);
    setAccordionContent('accordionContent2', accordionText2);
    // Add more as needed
});




//old
document.getElementById('run-script').addEventListener('click', () => {
    chrome.storage.local.remove('extractedData', function() {
        console.log('Stored data cleared');
    });
    
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
    can be labeled Sustainable or Detrimental to the environment. \
    Make sure the ingredient/materials/part are unique. LIMIT 1 SENTENCE \
    ON WHY FOR EACH INGREDIENT/MATERIAL/PART. \
    Use abbreviated sentences and limit to 10 words. Format as \
    ex: '1. Animal Hide: Detrimental for the environment because...'. \
    SECTION 2: Describe the company's environmental \
    reputation and sustainability using web resources to research \
    their reputation. LIMIT 2 SENTENCES. Use abbreviated sentences \
    and limit to 10 words per sentence for this section. SECTION 3: \
    Based on SECTION 1 and 2, generate a grade for the product from \
    A, B, C, D, F, with A being very environmentally sustainable and \
    F being detrimental. Make sure the letter is included in 1 brief \
    sentence and surrounded by spaces. ex: `Grade of A because...`. \
    If you determine that the grade is an A, add 1 more sentence \
    (that starts with the word 'Other')giving three other products \
    that are also sustainable. If the \
    grade is anything other than an A, add sentence giving 3 sustainable \
    alternative product options to buy instead also starting with \
    the word 'Other'";

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
        const extractedData = data.extractedData;

        chrome.storage.local.set({ extractedData: extractedData }, function() {
            console.log('Data is saved in Chrome storage');
        });

        if (extractedData && extractedData.productGrade) {
            setGrade(extractedData.productGrade);
        }

        if (extractedData && extractedData.ingredientDetails) {
            setIconConditionFromDetails(extractedData.ingredientDetails);
        }

        if (extractedData && extractedData.ingredients && extractedData.ingredientDetails) {
            for (let i = 0; i < extractedData.ingredients.length; i++) {
                setIngredient(`ingredient${i + 1}`, extractedData.ingredients[i]);
                setMoreContent(`moreContent${i + 1}`, extractedData.ingredientDetails[i]);
            }
        }

        if (extractedData && extractedData.companyInfo) {
            setAccordionContent('accordionContent1', extractedData.companyInfo);
        }

        if (extractedData && extractedData.otherOptions) {
            setAccordionContent('accordionContent2', extractedData.otherOptions);
        }

        console.log('data', extractedData)
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


