import 'core-js/stable';
import 'regenerator-runtime/runtime.js';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import { loadSearchResults } from './model.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SECONDS } from './config.js';

const controlServings = function (updateTo) {
  // update view
  model.updateServings(updateTo);
  recipeView.update(model.state.recipe);
};
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Rendering spinner
    recipeView.renderSpinner();
    // loading recipe
    await model.loadRecipe(id);
    // updating results
    resultsView.update(model.getSearchResultPage());
    //rendering results
    recipeView.render(model.state.recipe);
    // update bookmarks
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
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(function () {
      addRecipeView.closeWindow();
    }, MODAL_CLOSE_SECONDS * 1000);
  } catch (e) {
    console.error(e, '💕');
    addRecipeView.renderError(e.message);
  }
  // upload new recipe
};
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSerch(controlSearchResults);
  paginationView.addHandlerClick(pageController);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  bookmarksView.addHandlerRender(controlBookmarks);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
if (module.hot) {
  module.hot.accept();
}

///////////////////////////////////////
