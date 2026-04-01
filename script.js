const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const recipeContainer = document.getElementById("recipeContainer");
const loading = document.getElementById("loading");
const mealTypeSelect = document.getElementById("mealTypeSelect");

searchButton.addEventListener("click", getRecipes);
mealTypeSelect.addEventListener("change", filterByMealType);

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

  displayRecipes(data.recipes);
}

async function loadAllRecipes() {
  loading.style.display = "block";
  recipeContainer.innerHTML = "";

  let response = await fetch("https://dummyjson.com/recipes");

  let data = await response.json();

  loading.style.display = "none";

  displayRecipes(data.recipes);
}

async function filterByMealType() {
  let selectedType = mealTypeSelect.value;

  loading.style.display = "block";
  recipeContainer.innerHTML = "";

  let response = await fetch("https://dummyjson.com/recipes");

  let data = await response.json();


  loading.style.display = "none";

  let recipes = data.recipes;

  if (selectedType !== "All") {
    recipes = recipes.filter(function(recipe) {

      return recipe.mealType.includes(selectedType);

});
  }

  displayRecipes(recipes);
}

function displayRecipes(recipes) {
  recipeContainer.innerHTML = "";

  recipes.forEach(function (recipe) {
let card = document.createElement("div");

card.className = "card";

card.innerHTML =
  "<img src='" + recipe.image + "'>" +
  "<h3>" + recipe.name + "</h3>";

recipeContainer.appendChild(card);
  });
}

loadAllRecipes();
