import 'core-js/stable';
import 'regenerator-runtime/runtime.js';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
const recipeContainer = document.querySelector('.recipe');

const toggleMessage = function () {
  document.querySelector('.message').remove();
};

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Rendering recipe
    document.querySelector('.recipe').innerHTML = '';
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
    const ingredientsContainer = document.querySelector(
      '.recipe__ingredient-list'
    );
  } catch (e) {
    console.log(e);
  }
};

console.log(model);
['load', 'hashchange'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
///////////////////////////////////////
