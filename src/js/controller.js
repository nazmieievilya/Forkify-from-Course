import 'core-js/stable';
import 'regenerator-runtime/runtime.js';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import { loadSearchResults } from './model.js';
import paginationView from './views/paginationView.js';

const toggleMessage = function () {
  document.querySelector('.message').remove();
};

const controlServings = function (updateTo) {
  // update recipe servings in state
  let servings = model.state.recipe.servings;

  model.updateServings(updateTo);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);

  // update view
};
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Rendering recipe
    recipeView.renderSpinner();
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (e) {
    console.log(e);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    model.state.search.page = 1;
    // get search query
    const query = searchView.getQuery();
    if (!query) return;
    // load search results
    resultsView.renderSpinner();
    await model.loadSearchResults(query);
    // render search results
    resultsView.render(model.getSearchResultPage());
    // render pagination
    paginationView.render(model.state.search);
  } catch (e) {
    console.log(e);
  }
};
const pageController = function (page) {
  resultsView.render(model.getSearchResultPage(page));
  paginationView.render(model.state.search);
};

controlSearchResults();
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSerch(controlSearchResults);
  paginationView.addHandlerClick(pageController);
  recipeView.addHandlerUpdateServings(controlServings);
};

init();
if (module.hot) {
  module.hot.accept();
}

///////////////////////////////////////
