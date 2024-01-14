
function getAllText(node) {
    if (node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE') {
        return '';
    }

    var allText = '';
    node.childNodes.forEach(function(childNode) {
        if (childNode.nodeType === Node.TEXT_NODE) {
            allText += childNode.textContent.trim() + ' ';
        } else {
            allText += getAllText(childNode);
        }
    });
    return allText;
}

function sanitizeText(text) {
    return text
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Remove non-printable and control characters
        .replace(/["\\]/g, '\\$&') // Escape backslashes and double quotes
        .replace(/[^\x20-\x7E]/g, '') // Remove non-ASCII characters
        .replace(/\s+/g, ' '); // Replace multiple whitespace with single space
}

let bodyText = getAllText(document.body);
let sanitizedText = sanitizeText(bodyText);
chrome.runtime.sendMessage({ scrapedText: sanitizedText });
console.log("Sent data to popup:", sanitizedText);
