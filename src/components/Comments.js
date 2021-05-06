import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import { useParams, Link } from "react-router-dom";
import api from "../server/api";

function Comments() {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);

  function renderArrComment() {
    return comments.map((item) => {
      return (
        <Comment
          key={item.id}
          text={item.body}
          id={item.id}
          handleCommentDelete={handleCommentDelete}
        />
      );
    });
  }

  useEffect(() => {
    api
      .getComments(postId)
      .then(async (res) => {
        if (res.ok) {
          return await res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .then((result) => {
        setComments(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [newComments, setNewComments] = useState([]);

  const onChangeNewComment = (e) => {
    setNewComments(e.target.value);
  };

  const submitNewComment = (e) => {
    e.preventDefault();
    api.postNewComment(newComments, postId).then((res) => {
      setComments([...comments, res]);
      setNewComments("");
    });
  };

  function handleCommentDelete(id) {
    api.deleteComment(id).then(() => {
      const newComments = comments.filter((c) => {
        return c.id !== id;
      });
      setComments(newComments);
    });
  }

  return (
    <div className="grid">
      <div className="grid__title-container">
        <h1 className="grid__title">Коментарии</h1>
        <Link to="/posts">
          <button className="grid__button-new-post">&#129044;</button>
        </Link>
      </div>
      <div className="grid__container">
        {renderArrComment()}
        <h2 className="grid__text">Новый коментарий</h2>
        <input
          className="grid__text grid__text_new-comment-input"
          type="text"
          maxLength={140}
          name="comment"
          value={newComments}
          onChange={onChangeNewComment}
        />
        <form className="grid__change-text-form" onSubmit={submitNewComment}>
          <button className="grid__save-button" />
        </form>
      </div>
    </div>
  );
}

export default Comments;
