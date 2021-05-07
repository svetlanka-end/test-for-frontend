import "../index.css";
import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./Main";
import Comments from "./Comments";
import PopupNewPost from "./PopupNewPost";
import api from "../server/api";

function App() {
  const [posts, setPosts] = useState([]);

  const [isPopupNewPost, setPopupNewPost] = useState(false);

  const handlePopupNewPostClick = () => setPopupNewPost(true);

  function closeAllPopups() {
    setPopupNewPost(false);
  }

  // публикация нового поста

  function setNewPost(post) {
    const newPost = {
      title: post.name,
      body: post.text,
    };

    api.postNewPost(newPost).then((res) => {
      setPosts([res, ...posts]);
      closeAllPopups();
    });
  }

  // получение постов

  useEffect(() => {
    api
      .getPosts()
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .then((result) => {
        setPosts(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // ФУНКЦИИ ПОСТА

  function handleDeletePost(id) {
    api.deletePost(id).then(() => {
      const newPosts = posts.filter((c) => c.id !== id);
      setPosts(newPosts);
    });
  }

  return (
    <div className="page">
      <div className="page__container">
        <Switch>
          <Route exact path="/posts">
            <Main
              posts={posts}
              onPopupNewPost={handlePopupNewPostClick}
              onClickDelete={handleDeletePost}
            />
          </Route>
          <Route path="/posts/:postId">
            <Comments />
          </Route>
          <Redirect from="/" to="/posts" />
        </Switch>

        <PopupNewPost
          isOpen={isPopupNewPost}
          onClose={closeAllPopups}
          setNewPost={setNewPost}
        />
      </div>
    </div>
  );
}

export default App;
