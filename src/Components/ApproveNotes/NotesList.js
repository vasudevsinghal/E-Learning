import React from "react";
import axios from "axios";
import BACKEND_URL from "../../url";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router";
import moment from "moment";
import Button from "react-bootstrap/Button";

const NotesList = () => {
  const params = useParams();
  const baseURL = `${BACKEND_URL}/api/note/getRequestedNotes/${params.courseId}`;

  const [sharedNotesList, setSharedNotesList] = React.useState(null);

  React.useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    try {
      const response = await axios.get(baseURL);
      setSharedNotesList(response.data.notes);
    } catch (e) {
      console.log(e);
    }
  };

  async function approveOrDisapprove(status, index) {
    const noteId = sharedNotesList[index]._id;
    const baseURL = `${BACKEND_URL}/api/note/${noteId}/${status}`;
    try {
      const response = await axios.patch(baseURL);
      if (response.status === 200) {
        setSharedNotesList((oldValues) => {
          return oldValues.filter((_, i) => i !== index);
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      {sharedNotesList &&
        sharedNotesList.map((note, index) => {
          return (
            <Card key={index} style={{ margin: "1% 2% 2% 2%" }}>
              <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>
                  <textarea
                    readOnly
                    rows="5"
                    placeholder="Enter Notes here"
                    id="notes-value"
                    value={note.content}
                    style={{ width: "100%" }}
                  ></textarea>
                </Card.Text>
                <div>
                  <b>Shared by </b> - {note.createdBy.fullName} <b>Shared on</b>{" "}
                  - {moment(note.updatedAt).format("YYYY-MM-DD")} {"\n"}
                </div>
                <div>
                  <b>Video Title</b> - {note.videoTitle} <b>Lecture Number</b> -{" "}
                  {note.lectureNumber} <b>Video Number</b> - {note.videoNumber}
                </div>
                <div>
                  <Button
                    variant="success"
                    onClick={() => approveOrDisapprove("approve", index)}
                  >
                    Approve Note
                  </Button>{" "}
                  <Button
                    variant="warning"
                    onClick={() => approveOrDisapprove("disapprove", index)}
                  >
                    Disapprove Note
                  </Button>{" "}
                </div>
              </Card.Body>
            </Card>
          );
        })}
    </>
  );
};

export default NotesList;
