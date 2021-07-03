class Api {

  constructor() {
    this.BASE_URL = 'https://api.ancher-movies-project.nomoredomains.icu/';
  }

  _checkResponse(res) {
    if (res.ok) {
        return res.json();
      }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  register ({name, password, email}) {
  return fetch(`${this.BASE_URL}signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, password, email})
  })
  .then((response) => {
    try {
      if (response.status === 200 || response.status === 201){
        return response.json();
      }
      if (response.status === 400) {
        console.log('400 - некорректно заполнено одно из полей')
      }
    } catch(e) {
      return (e)
    }
  })
  }; 

  login({password, email}) {
  return fetch(`${this.BASE_URL}signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((response) => {
      if (response.status === 200){
        return response.json();
      }
      if (response.status === 400) {
        console.log('400 - не передано одно из полей')
      }
      if (response.status === 401) {
        console.log('401 - пользователь с email не найден')
      }
    })
    .then((data) => {
      if (data.token){
        localStorage.setItem('token', data.token);
        return data;
      } else {
        console.log('Ошибка в методе Логин -> получение Токена')
      }
    })
  .catch((err) => console.log(err));
  };

  validity(token) {
  return fetch(`${this.BASE_URL}users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : token
    }
  })
  .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      if (response.status === 401) {
        console.log('401 — Токен не передан или передан не в том формате') 
      }
      if (response.status === 401) {
        console.log('401 — Переданный токен некорректен')
      }
    })
  .catch((err) => console.log(err));
  };

  updateUserInfo ({name, email}, token) {
      return fetch(`${this.BASE_URL}users/me`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization" : token
        },
        body: JSON.stringify({
          name: name,
          email: email
      })
    }).then(this._checkResponse)
  }

  getMyProfileInfo(token) {
    return fetch(`${this.BASE_URL}users/me`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : token
      },
      method: "GET",
    }).then(this._checkResponse)
  }

  saveCard(movie, token) {
    return fetch(`${this.BASE_URL}movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : token
      },
      body: JSON.stringify({
        country: movie.country ? movie.country : ``,
        director: movie.director ? movie.director : ``,
        duration: movie.duration ? movie.duration : ``,
        year: movie.year ? movie.year : ``,
        description: movie.description ? movie.description : ``,
        image: movie.image.url ? movie.image.url : ``,
        trailer: movie.trailerLink ? movie.trailerLink : ``,
        nameRU: movie.nameRU ? movie.nameRU : movie.nameEN,
        nameEN: movie.nameEN ? movie.nameEN : movie.nameRU,
        thumbnail : movie.image.formats.thumbnail.url ? movie.image.formats.thumbnail.url : ``,
        movieId: movie.id ? movie.id : ``,
      })
    }).then(this._checkResponse)
  }

  getSavedMovies(token) {
    return fetch(`${this.BASE_URL}movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : token
      },
    })
  }

  deleteFilm(id, token) {
    return fetch(`${this.BASE_URL}movies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : token
      },
    }).then(this._checkResponse)
  }


} 
const MainApi = new Api();
export default MainApi;