import { async } from 'regenerator-runtime';
import { API_URL, RESULTS_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const { recipe } = await getJSON(`${API_URL}/${id}`);
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    if (state.bookmarks.some(bookmark => bookmark.id === state.recipe.id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (e) {
    throw e;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
      };
    });
  } catch (e) {
    throw e;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const resultsPerPage = state.search.resultsPerPage;
  const start = (page - 1) * resultsPerPage;
  const end = page * resultsPerPage;
  return state.search.results.slice(start, end);
};
export const updateServings = function (numberOfServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity / state.recipe.servings) * numberOfServings;
  });
  state.recipe.servings = numberOfServings;
};
export const addBookmark = function (recipe) {
  if (!state.recipe.bookmarked) {
    state.recipe.bookmarked = true;
  }
  state.recipe.bookmarked = !state.recipe.bookmarked;

  // add bookmark to the state
  state.bookmarks.push(recipe);

  // mark current recipe as bookmarked
  if (state.recipe === recipe) state.recipe.bookmarked = true;
};

export const deleteBookmark = function (id) {
  state.bookmarks = state.bookmarks.filter(bookmark => bookmark.id !== id);
};
