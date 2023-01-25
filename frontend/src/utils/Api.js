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
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/users/me`,
        {
            headers: {...this._headers, authorization: `Bearer ${token}`}
        })
        .then(res => this._checkResponse(res))
    }

    getCards(){
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/cards`,{
            headers: {...this._headers, authorization: `Bearer ${token}`}
        })
        .then(res => this._checkResponse(res))
    }

    editProfil({name, about}){
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {...this._headers, authorization: `Bearer ${token}`},
            body: JSON.stringify({
                name,
                about
            })
        })
        .then(res => this._checkResponse(res));
    }

    addNewCard(data){
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {...this._headers, authorization: `Bearer ${token}`},
            body: JSON.stringify({
                name: data.imageName,
                link: data.imageLink
            })
        })
        .then(res => this._checkResponse(res));
    }

    deleteCard(idCard){
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/cards/${idCard}`, {
            method: 'DELETE',
            headers: {...this._headers, authorization: `Bearer ${token}`},
          })
            .then(res => this._checkResponse(res));
        }
    
    editAvatar(avatarLink){
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {...this._headers, authorization: `Bearer ${token}`},
            body: JSON.stringify({
                avatar: avatarLink
            })
        })
        .then(res => this._checkResponse(res));
    }  

    putLike(idCard){
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
            method: 'PUT',
            headers: {...this._headers, authorization: `Bearer ${token}`},
        })
        .then(res => this._checkResponse(res));
    }

    deleteLike(idCard){
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
            method: 'DELETE',
            headers: {...this._headers, authorization: `Bearer ${token}`},
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
    baseUrl: 'http://https://mesto.alxschg.nomoredomains.rocks',
    headers: {
      'Content-Type': 'application/json'
    }
  }); 

  export default api;