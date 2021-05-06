import "../index.css";
import React, { useState } from "react";
import api from "../server/api";

function Comment({ handleCommentDelete, id, text }) {
  const deleteComment = () => {
    handleCommentDelete(id);
  };

  const handleUpdateComment = () => {
    isInputDisabled && setNewCommentText(editableCommentText);
    setInputDisabled(!isInputDisabled);
  };

  const [isInputDisabled, setInputDisabled] = useState(true);

  const [newCommentText, setNewCommentText] = useState(text);

  const handleChangeComment = (e) => {
    setNewCommentText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    api
      .changeComment(id, newCommentText)
      .then(setEditableCommentText(newCommentText));
  };

  const [editableCommentText, setEditableCommentText] = useState(text);

  return (
    <div className="grid__element">
      {isInputDisabled ? (
        <p className="grid__text">{editableCommentText}</p>
      ) : (
        <>
          <input
            className="grid__text"
            type="text"
            name="comment"
            size="40"
            maxLength={140}
            value={newCommentText}
            disabled={isInputDisabled}
            onChange={handleChangeComment}
          />
          <button
            className="grid__return-button"
            onClick={handleUpdateComment}
          />
        </>
      )}
      <form className="grid__change-text-form" onSubmit={onSubmit}>
        <button
          type="submit"
          className={
            isInputDisabled ? "grid__update-button" : "grid__save-button"
          }
          onClick={handleUpdateComment}
        />
      </form>
      <button className="grid__delete-button" onClick={deleteComment} />
    </div>
  );
}

export default Comment;
