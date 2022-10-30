import previewView from './previewView.js';
import View from './View.js';

class bookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage =
    'No bookmarks found yet find. Find a nice recipe and bookmark it)';

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new bookmarksView();
