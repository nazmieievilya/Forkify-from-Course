import previewView from './previewView.js';
import View from './View.js';
class resultsView extends View {
  _parentElement = document.querySelector('.results');

  _errorMessage = 'No recipes found for your query :(';
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new resultsView();
