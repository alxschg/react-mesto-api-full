class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
  
    _checkResponse(res){
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo(){
        return fetch(`${this._baseUrl}/users/me`,
        {
            headers: this._headers
        })
        .then(res => this._checkResponse(res))
    }

    getCards(){
        return fetch(`${this._baseUrl}/cards`,{
            headers: this._headers
        })
        .then(res => this._checkResponse(res))
    }

    editProfil({name, about}){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        })
        .then(res => this._checkResponse(res));
    }

    addNewCard(data){
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.imageName,
                link: data.imageLink
            })
        })
        .then(res => this._checkResponse(res));
    }

    deleteCard(idCard){
        return fetch(`${this._baseUrl}/cards/${idCard}`, {
            method: 'DELETE',
            headers: this._headers
          })
            .then(res => this._checkResponse(res));
        }
    
    editAvatar(avatarLink){
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarLink
            })
        })
        .then(res => this._checkResponse(res));
    }  

    putLike(idCard){
        return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
        .then(res => this._checkResponse(res));
    }

    deleteLike(idCard){
        return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(res => this._checkResponse(res));
    }

    changeLikeCardStatus(idCard, isLiked) {
        if (isLiked) {
          return this.deleteLike(idCard);
        } else {
          return this.putLike(idCard);
        }
      }
    
  }
  
  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
    headers: {
      authorization: '91c374b9-c64e-4621-8c13-f2fddf25afb9',
      'Content-Type': 'application/json'
    }
  }); 

  export default api;