import React from "react";
import Post from "./Post";

function Main({ onClickDelete, onPopupNewPost, posts }) {
  return (
    <div className="grid">
      <div className="grid__title-container">
        <h1 className="grid__title">Лента</h1>
        <button className="grid__button-new-post" onClick={onPopupNewPost}>
          +
        </button>
      </div>
      <div className="grid__container">
        {posts.map((item) => {
          return (
            <Post
              key={item.id}
              name={item.title}
              text={item.body}
              id={item.id}
              onClickDelete={onClickDelete}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Main;
