import "../index.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../server/api";

function Post({ onClickDelete, id, text, name }) {
  const [isInputDisabled, setInputDisabled] = useState(true);

  const [newPostText, setNewPostText] = useState(text);

  function handlePostDelete() {
    onClickDelete(id);
  }

  function handleUpdatePost() {
    setInputDisabled(!isInputDisabled);
  }

  const handleChangeText = (e) => {
    setNewPostText(e.target.value);
  };

  function onSubmit(e) {
    e.preventDefault();
    api.changePost(id, newPostText);
  }

  return (
    <div className="grid__element">
      <p className="grid__name">{name}</p>
      <input
        className="grid__text"
        type="text"
        name="comment"
        maxLength={140}
        size="40"
        value={newPostText}
        disabled={isInputDisabled}
        onChange={handleChangeText}
      />
      <Link to={`/posts/${id}`}>
        <button className="grid__comment-button"></button>
      </Link>
      <form onSubmit={onSubmit} className="grid__change-text-form">
        <button
          className={
            isInputDisabled ? "grid__update-button" : "grid__save-button"
          }
          onClick={handleUpdatePost}
        />
      </form>
      <button className="grid__delete-button" onClick={handlePostDelete} />
    </div>
  );
}

export default Post;
