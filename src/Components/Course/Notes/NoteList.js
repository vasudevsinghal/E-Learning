import React, { useState } from "react";
import axios from "axios";
import BACKEND_URL from "../../../url";
import { useParams } from "react-router";
import NoteCard from "./NoteCard";
import Note from "./Note";
import Button from "react-bootstrap/Button";
import AddNote from "./AddNote";

function NoteList({}) {
  const params = useParams();
  const baseURL = `${BACKEND_URL}/api/note/${params.videoId}`;

  const [notesList, setNotesList] = React.useState(null);
  const [toggleBool, setToggleBool] = React.useState(null);
  const [toggle, setToggle] = useState(true);

  const toggleIt = () => {
    setToggle(!toggle);
  };

  React.useEffect(() => {
    refresh();
  }, []);

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
    <div>
      <div>
        {toggle ? (
          <Button
            variant="warning"
            onClick={toggleIt}
            style={{ margin: "2% auto", display: "block" }}
          >
            Add a Note
          </Button>
        ) : (
          <AddNote
            setNotesList={setNotesList}
            setToggleBool={setToggleBool}
            toggle={toggle}
            setToggle={setToggle}
          />
        )}
      </div>
      <div>
        {toggleBool &&
          notesList &&
          notesList.map((note, index) => {
            return toggleBool[index] ? (
              <NoteCard
                key={index}
                content={note}
                setToggleBool={setToggleBool}
                toggleBool={toggleBool}
                setNotesList={setNotesList}
                notesList={notesList}
                index={index}
              />
            ) : (
              <Note
                key={index}
                content={note}
                setNotesList={setNotesList}
                notesList={notesList}
                setToggleBool={setToggleBool}
                toggleBool={toggleBool}
                index={index}
              />
            );
          })}
      </div>
    </div>
  );
}

export default NoteList;
