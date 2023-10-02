import React, { useState,  } from "react";
import axios from "axios";
import BACKEND_URL from "../../../url";
import { useParams } from "react-router";
function Notepad({ noteList, setNoteList, setIsLoading, setDefaultTab }) {
  const [notesText, setNotesText] = useState("");
  const params = useParams();
const videoId = params.videoId; 

  const onSaveNotes = async () => {
    const data = { title: 'TITLE', content: notesText,  video: videoId};
    setNotesText("");
    try {
      setIsLoading(true);
      const res = await axios.post(`${BACKEND_URL}/api/note`, data);
      setNoteList(noteList.concat(res.data.note));
      setDefaultTab(3)
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeValue = (event) => {
    setNotesText(event.target.value);
  };

  return (
    <div
      className="Note-pad"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <textarea
        rows="5"
        cols="30"
        placeholder="Enter Notes here"
        id="notes-value"
        value={notesText}
        onChange={onChangeValue}
      />
      <button className="save-button" onClick={onSaveNotes}>
        Save
      </button>
    </div>
  );
}

export default Notepad;
