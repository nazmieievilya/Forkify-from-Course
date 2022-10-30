import 'core-js/stable';
import 'regenerator-runtime/runtime.js';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import { loadSearchResults } from './model.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

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
    resultsView.update(model.getSearchResultPage());
    recipeView.render(model.state.recipe);
    bookmarksView.update(model.state.bookmarks);
  } catch (e) {
    console.log(e);
    recipeView.renderError();
  }
};
const controlAddBookmark = function () {
  if (
    model.state.bookmarks.some(
      bookmark => bookmark.id === model.state.recipe.id
    )
  ) {
    model.deleteBookmark(model.state.recipe.id);
    model.state.recipe.bookmarked = false;
    recipeView.update(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
    return;
  }
  model.addBookmark(model.state.recipe);
  // update recipe view
  recipeView.update(model.state.recipe);
  // render bookmarks
  bookmarksView.render(model.state.bookmarks);
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
  recipeView.addHandlerBookmark(controlAddBookmark);
};

init();
if (module.hot) {
  module.hot.accept();
}

///////////////////////////////////////
