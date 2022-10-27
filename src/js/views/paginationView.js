import View from './View.js';
import icons from 'url:../../img/icons.svg';
class paginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _generateMarkup() {
    const numberOfPages = this._data.results.length / this._data.resultsPerPage;
    console.log(numberOfPages);
    // we are on page 1 and there are other pages
    // we are on page 1 and there are no other pages
    // we are on last page
    // we ate on some other page
  }
}

export default new paginationView();
