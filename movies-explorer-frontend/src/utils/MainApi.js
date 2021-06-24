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
        'credentials': 'include',
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
      'credentials': 'include',
    }).then(this._checkResponse)
  }

} 
const MainApi = new Api();
export default MainApi;