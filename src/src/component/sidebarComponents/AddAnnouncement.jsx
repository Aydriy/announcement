import React, { useState } from "react";
import AnnouncementItem from "./AnnouncementItem.jsx";
import { Plus, CancelAnnouncement } from "../Elements";
import axios from "axios";

const AddFolder = ({ onAddList }) => {
  const [showForm, setShowForm] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [isDate, setDate] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  const date = new Date().toLocaleString();

  const onClose = () => {
    setShowForm(false);
    setInputValue("");
    setInputDescription("");
    setDate("");
  };
  const addList = () => {
    if (!inputValue) {
      alert("The title is empty");
      return;
    } else if (!inputDescription) {
      alert("The description is empty");
      return;
    }
    setisLoading(true);
    axios
      .post("http://localhost:3001/lists", {
        name: inputValue,
        description: inputDescription,
        date: isDate,
      })
      .then(({ data }) => {
        const lostObj = { ...data };

        onAddList(lostObj);
        onClose();
      })
      .catch(() => {
        alert("Error...");
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  return (
    <div className="add-list">
      <AnnouncementItem
        onClick={() => {
          setShowForm(!showForm);
          setDate(date);
          setInputValue("");
          setInputDescription("");
        }}
        items={[
          {
            class: "sidebar__add-folder",
            icon: <Plus />,
            name: "Add announcement",
          },
        ]}
      />
      {showForm && (
        <div className="add-list__form">
          <div onClick={onClose} className="add-list__button-close">
            <CancelAnnouncement />
          </div>

          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Title"
            className="add-list__input-add-announcement field mb-2"
          />
          <input
            value={inputDescription}
            onChange={(e) => setInputDescription(e.target.value)}
            type="text"
            placeholder="Description"
            className="add-list__input-add-announcement field mb-2"
          />
          <input
            value={"Added: " + isDate}
            type="text"
            placeholder="date"
            className="add-list__input-add-announcement field"
            disabled
          />
          {isLoading ? (
            <button
              onClick={addList}
              className="add-list__button buttonAdd buttonAddLoad"
              disabled
            >
              Loading...
            </button>
          ) : (
            <button onClick={addList} className="add-list__button buttonAdd">
              Add
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AddFolder;
