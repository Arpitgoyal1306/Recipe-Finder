const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const recipeContainer = document.getElementById("recipeContainer");
const loading = document.getElementById("loading");

searchButton.addEventListener("click", getRecipes);

async function getRecipes() {
  let query = searchInput.value;

  if (query === "") {
    alert("Enter a recipe name");
    return;
  }

  loading.style.display = "block";
  recipeContainer.innerHTML = "";

  let response = await fetch("https://dummyjson.com/recipes/search?q=" + query);

  let data = await response.json();
  
  loading.style.display = "none";
  
  data.recipes.forEach(function (recipe) {
    let card = document.createElement("div");
    
    card.className = "card";
    
    card.innerHTML =
    "<img src='" + recipe.image + "'>" + "<h3>" + recipe.name + "</h3>";
    
    recipeContainer.appendChild(card);
  });
}

async function loadAllRecipes() {
  loading.style.display = "block";
  recipeContainer.innerHTML = "";
  
  let response = await fetch("https://dummyjson.com/recipes")
  let data = await response.json();

  loading.style.display = "none";

  data.recipes.forEach(function (recipe) {
    let card = document.createElement("div");

    card.className = "card";

    card.innerHTML =
      "<img src='" + recipe.image + "'>" + "<h3>" + recipe.name + "</h3>";

    recipeContainer.appendChild(card)
  });
}

loadAllRecipes();

