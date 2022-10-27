class searchView {
  _parentElemnt = document.querySelector('.search');
  getQuery() {
    const query = this._parentElemnt.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }
  addHandlerSerch(handler) {
    this._parentElemnt.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
  _clearInput() {
    this._parentElemnt.querySelector('.search__field').value = '';
  }
}

export default new searchView();
