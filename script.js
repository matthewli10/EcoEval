document.addEventListener('DOMContentLoaded', function () {
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

document.addEventListener('DOMContentLoaded', function() {
       /* if (some condition){
        setGrade('A');
    } */
    setGrade('D'); // CHANGE GRADE CONDITIONS HERE 
});

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

//setIngredient Function
function setIngredient(ingredientId, ingredientName) {
    var truncatedName = ingredientName.length > 20 ? ingredientName.substring(0, 20) + "..." : ingredientName;
    document.getElementById(ingredientId).textContent = truncatedName;
}
//Example
window.onload = function() {
    // Set ingredient names based on some logic or external data
    setIngredient('ingredient1', 'Grassdkfjslfkjsdldsffks');
    setIngredient('ingredient2', 'Spinach');
    setIngredient('ingredient3', 'Water');
};


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