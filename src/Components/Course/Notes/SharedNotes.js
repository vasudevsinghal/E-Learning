import React from "react";
import axios from "axios";
import BACKEND_URL from "../../../url";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router";
import Likes from "./Likes";
import moment from "moment";

const SharedNotes = () => {
  const params = useParams();
  const baseURL = `${BACKEND_URL}/api/note/shared/${params.videoId}`;

  const [sharedNotesList, setSharedNotesList] = React.useState(null);

  React.useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    try {
      const response = await axios.get(baseURL);
      setSharedNotesList(response.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

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
                  <a href={`mailto:${note.createdBy.email}`}>
                    Shared by - {note.createdBy.fullName}
                  </a>{" "}
                  <p>
                    Shared on - {moment(note.updatedAt).format("YYYY-MM-DD")}
                  </p>{" "}
                  <Likes
                    totalLikes={note.totalLikes}
                    noteId={note._id}
                    userLiked={note.userLiked}
                  />
                </div>
              </Card.Body>
            </Card>
          );
        })}
    </>
  );
};

export default SharedNotes;
