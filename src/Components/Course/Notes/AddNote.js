import React, { useState } from "react";
import axios from "axios";
import BACKEND_URL from "../../../url";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";

const AddNote = ({ setNotesList, setToggleBool, toggle, setToggle }) => {
  const params = useParams();
  const baseURL = `${BACKEND_URL}/api/note/${params.videoId}`;

  const [notesText, setNotesText] = useState("");
  const [notesTitle, setNotesTitle] = useState("");

  const onChangeValue = (event) => {
    setNotesText(event.target.value);
  };

  const onChangeTitle = (event) => {
    setNotesTitle(event.target.value);
  };

  const save = async () => {
    try {
      const postURL = `${BACKEND_URL}/api/note/${params.videoId}`;
      await axios.post(postURL, { title: notesTitle, content: notesText });
      refresh();
      setToggle(!toggle);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleIt = () => {
    setToggle(!toggle);
  };

  const refresh = async () => {
    try {
      const response = await axios.get(baseURL);
      setNotesList(response.data.notes);
      let array = new Array(response.data.notes.length).fill(true);
      setToggleBool(array);
    } catch (e) {
      console.log(e);
    }
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
        style={{ width: "100%", margin: "1% 2% 2% 2%" }}
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

export default AddNote;
