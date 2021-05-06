import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function PopupNewPost(props) {
  const [newPostName, setNewPostName] = useState("");
  const [newPostText, setNewPostText] = useState("");

  const handlePlaceName = (e) => {
    setNewPostName(e.target.value);
  };

  const handlePlaceLink = (e) => {
    setNewPostText(e.target.value);
  };

  const handleAddPostSubmit = (e) => {
    e.preventDefault();
    props.setNewPost({
      name: newPostName,
      text: newPostText,
    });
    resetInputPopupAdd();
  };

  const resetInputPopupAdd = () => {
    setNewPostName("");
    setNewPostText("");
  };

  const onClose = () => {
    props.onClose();
    resetInputPopupAdd();
  };

  return (
    <PopupWithForm
      name="place_add"
      title="Добавить пост"
      isOpen={props.isOpen}
      onClose={onClose}
      onSubmit={handleAddPostSubmit}
    >
      <div className="popup__input-form">
        <input
          placeholder="Название"
          id="title-input"
          className="popup__input popup__input_type_name-add"
          name="title"
          required
          value={newPostName}
          minLength={2}
          maxLength={30}
          onChange={handlePlaceName}
        />
      </div>
      <div className="popup__input-form">
        <input
          placeholder="Текст"
          id="url-input"
          className="popup__input popup__input_type_photo-add"
          name="body"
          value={newPostText}
          required
          maxLength={140}
          onChange={handlePlaceLink}
        />
      </div>
    </PopupWithForm>
  );
}

export default PopupNewPost;
