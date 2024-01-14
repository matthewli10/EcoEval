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

