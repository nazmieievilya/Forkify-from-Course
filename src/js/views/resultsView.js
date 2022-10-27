import View from './View.js';
import icons from 'url:../../img/icons.svg';
class resultsView extends View {
  _parentElement = document.querySelector('.results');
  _data;
  _errorMessage = 'No recipes found for your query :(';
  _generateMarkup() {
    return this._data.map(el => {
      return `
      <li class="preview">
        <a class="preview__link" href="#${el.id}">
          <figure class="preview__fig">
            <img src="${el.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${el.title}</h4>
            <p class="preview__publisher">${el.publisher}</p>
                <div class="preview__user-generated">
                <svg>
                    <use href="${icons}#icon-user"></use>
                </svg>
                </div>
          </div>
        </a>
      </li>`;
    });
  }
}

export default new resultsView();

// const markup = ;
