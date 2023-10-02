import React, { useState } from "react";
import axios from "axios";
import BACKEND_URL from "../../../url";
import Button from "react-bootstrap/Button";

const Note = ({
  content,
  setNotesList,
  notesList,
  setToggleBool,
  toggleBool,
  index,
}) => {
  const [notesText, setNotesText] = useState(content.content);
  const [notesTitle, setNotesTitle] = useState(content.title);

  const onChangeValue = (event) => {
    setNotesText(event.target.value);
  };

  const onChangeTitle = (event) => {
    setNotesTitle(event.target.value);
  };

  const save = async () => {
    const baseURL = `${BACKEND_URL}/api/note/${notesList[index]._id}`;
    try {
      await axios.patch(baseURL, { title: notesTitle, content: notesText });
      let array = [...notesList];
      array[index].content = notesText;
      array[index].title = notesTitle;
      setNotesList(array);

      let newtoggleBool = [...toggleBool];
      newtoggleBool[index] = !toggleBool[index];
      setToggleBool(newtoggleBool);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleIt = () => {
    let newtoggleBool = [...toggleBool];
    newtoggleBool[index] = !toggleBool[index];
    setToggleBool(newtoggleBool);
  };

  return (
    <div
      className="Note-pad"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        margin: "1% 2% 2% 2%",
      }}
    >
      <textarea
        rows="1"
        cols="30"
        placeholder="Enter Title here"
        value={notesTitle}
        onChange={onChangeTitle}
        style={{
          width: "100%",
          margin: "1% 2% 1% 2%",
        }}
      />
      <textarea
        rows="5"
        cols="30"
        placeholder="Enter Notes here"
        id="notes-value"
        value={notesText}
        onChange={onChangeValue}
        style={{
          width: "100%",
          margin: "1% 2% 2% 2%",
        }}
      />
      <div className="container">
        <Button
          variant="primary"
          onClick={save}
          style={{ margin: "0% 1% 0% 0%" }}
        >
          Save
        </Button>{" "}
        <Button
          variant="danger"
          onClick={toggleIt}
          style={{ margin: "0% 1% 0% 0%" }}
        >
          Back
        </Button>{" "}
      </div>
    </div>
  );
};

export default Note;
