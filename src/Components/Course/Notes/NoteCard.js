import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import BACKEND_URL from "../../../url";
import ShareNote from "./ShareNote";
const NoteCard = ({
  content,
  setToggleBool,
  toggleBool,
  setNotesList,
  notesList,
  index,
}) => {
  const toggle = () => {
    let newtoggleBool = [...toggleBool];
    newtoggleBool[index] = !toggleBool[index];
    setToggleBool(newtoggleBool);
  };

  const deleteNote = () => {
    const note = notesList[index];
    try {
      axios.delete(`${BACKEND_URL}/api/note/${note._id}`);
    } catch (e) {
      console.log(e);
    }
    const remainingNotes = notesList.filter((item, ind) => {
      return ind !== index;
    });
    setNotesList(remainingNotes);
  };

  return (
    <Card style={{ margin: "1% 2% 2% 2%" }}>
      <Card.Body>
        <Card.Title>{content.title}</Card.Title>
        <Card.Text>
          <textarea
            readOnly
            rows="6"
            cols="30"
            placeholder="Enter Notes here"
            id="notes-value"
            value={content.content}
            style={{ width: "100%" }}
          ></textarea>
        </Card.Text>
        <div className="container">
          <Button
            variant="primary"
            onClick={toggle}
            style={{ margin: "0% 1% 0% 0%" }}
          >
            Edit
          </Button>{" "}
          <Button
            variant="danger"
            onClick={deleteNote}
            style={{ margin: "0% 1% 0% 0%" }}
          >
            Delete
          </Button>{" "}
          <ShareNote
            setNotesList={setNotesList}
            notesList={notesList}
            index={index}
          ></ShareNote>
        </div>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;
