function getAllText(node) {
    var allText = "";
    node.childNodes.forEach(function(childNode) {
        if (childNode.nodeType === Node.TEXT_NODE) {
            allText += childNode.textContent.trim() + " ";
        } else {
            allText += getAllText(childNode);
        }
    });
    return allText;
}

let bodyText = getAllText(document.body);
console.log(bodyText);
