class Api {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  getPosts() {
    return fetch(`${this.baseUrl}/posts`, {
      method: "GET",
    }).then(this._checkResponse);
  }

  getComments(postId) {
    return fetch(`${this.baseUrl}/comments?postid=${postId}`, {
      method: "GET",
    }).then(this._checkResponse);
  }

  deletePost(id) {
    return fetch(`${this.baseUrl}/posts/${id}`, {
      method: "DELETE",
    }).then(this._checkResponse);
  }

  deleteComment(id) {
    return fetch(`${this.baseUrl}/comments/${id}`, {
      method: "DELETE",
    }).then(this._checkResponse);
  }

  changePost(id, body) {
    return fetch(`${this.baseUrl}/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "body=" + encodeURIComponent(body),
    }).then(this._checkResponse);
  }

  changeComment(id, body) {
    return fetch(`${this.baseUrl}/comments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "body=" + encodeURIComponent(body),
    }).then(this._checkResponse);
  }

  postNewPost(post) {
    return fetch(`${this.baseUrl}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "title=" +
        encodeURIComponent(post.title) +
        "&body=" +
        encodeURIComponent(post.body),
    }).then((res) => {
      return res.json();
    });
  }

  postNewComment(comment, postid) {
    return fetch(`${this.baseUrl}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "body=" +
        encodeURIComponent(comment) +
        "&postid=" +
        encodeURIComponent(postid),
    }).then((res) => {
      return res.json();
    });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res;
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

const api = new Api({
  baseUrl: "http://localhost:3002",
});

export default api;
