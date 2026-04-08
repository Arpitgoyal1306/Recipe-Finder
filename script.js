const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const recipeContainer = document.getElementById("recipeContainer");
const loading = document.getElementById("loading");
const mealTypeSelect = document.getElementById("mealTypeSelect");
const sortSelect = document.getElementById("sortSelect");

searchButton.addEventListener("click", getRecipes);
mealTypeSelect.addEventListener("change", filterByMealType);
sortSelect.addEventListener("change", loadAllRecipes);
searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getRecipes();
  }
});


async function getRecipes() {
  let query = searchInput.value;
  if (query === "") {
    alert("Enter a recipe name");
    return;
  }
  loading.style.display = "block";
  recipeContainer.innerHTML = "";
  try {
    let response = await fetch(
      "https://dummyjson.com/recipes/search?q=" + query
    );
    let data = await response.json();
    displayRecipes(data.recipes);
  } 
  catch (error) {
    recipeContainer.innerHTML =
      "<p>Something went wrong. Please try again.</p>";
  }
  loading.style.display = "none";
}

async function loadAllRecipes() {
  loading.style.display = "block";
  recipeContainer.innerHTML = "";
  try {
    let response = await fetch(
      "https://dummyjson.com/recipes"
    );
    let data = await response.json();
    displayRecipes(data.recipes);
  } 
  catch (error) {
    recipeContainer.innerHTML =
      "<p>Something went wrong. Please try again.</p>";
  }
  loading.style.display = "none";
}

async function filterByMealType() {
  let selectedType = mealTypeSelect.value;
  loading.style.display = "block";
  recipeContainer.innerHTML = "";
  try {
    let response = await fetch(
      "https://dummyjson.com/recipes"
  );
  let data = await response.json();
  let recipes = data.recipes;
  if (selectedType !== "All") {
    recipes = recipes.filter(function(recipe) {
      return recipe.mealType.includes(selectedType);
    });
  }
  displayRecipes(recipes);
  } 
  catch (error) {
    recipeContainer.innerHTML =
      "<p>Something went wrong. Please try again.</p>";
  }
  loading.style.display = "none";
}

function displayRecipes(recipes) {
  recipeContainer.innerHTML = "";
  let sortType = sortSelect.value;
  recipes = sortRecipes(recipes, sortType);
  if (recipes.length === 0) {
  recipeContainer.innerHTML =
    "<p>No recipes found</p>";
  return;
  }
  recipes.forEach(function (recipe) {
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML =
      "<img src='" + recipe.image + "'>" +
      "<h3>" + recipe.name + "</h3>";
    recipeContainer.appendChild(card);
  });
}

function sortRecipes(recipes, sortType) {
  if (sortType === "ratingHigh") {
    recipes.sort(function (a, b) {
      return b.rating - a.rating;
    });
  } else if (sortType === "ratingLow") {
    recipes.sort(function (a, b) {
      return a.rating - b.rating;
    });
  }
  return recipes;
}

loadAllRecipes();
