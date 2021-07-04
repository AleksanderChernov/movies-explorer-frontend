class outerApi {
  constructor() {
    this.BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';
  }

  _checkResponse(res) {
    if (res.ok) {
        return res.json();
      }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getMovies() {
    return fetch(`${this.BASE_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(this._checkResponse)
  };
};

const MoviesApi = new outerApi();

export default MoviesApi;