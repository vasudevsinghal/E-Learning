import Button from "react-bootstrap/Button";
import axios from "axios";
import BACKEND_URL from "../../../url";
import React from "react";

const ShareNote = ({ setNotesList, notesList, index }) => {
  var dict = {
    private: "Request For Making Public",
    public: "Make Private",
    requested: "Make Private",
  };

  var status = {
    private: "Note is Private",
    public: "Note is Public",
    requested: "Note is Under Review",
  };

  const shareIt = async () => {
    const newStatus =
      notesList[index].status === "public" ||
      notesList[index].status === "requested"
        ? "private"
        : "requested";
    const baseURL = `${BACKEND_URL}/api/note/share/${notesList[index]._id}`;

    try {
      await axios.patch(baseURL, { status: newStatus });
      let array = [...notesList];
      array[index].status = newStatus;
      setNotesList(array);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Button variant="info" onClick={shareIt}>
        {dict[notesList[index].status]}
      </Button>
      <p>Current Status - {status[notesList[index].status]}</p>
    </>
  );
};

export default ShareNote;
