import { Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import BACKEND_URL from "../../../url";

const NotesList = ({ noteList, setNoteList, setIsLoading }) => {
  console.log(noteList);
  const onDeleteNote = async (index) => {
    const note = noteList[index];
    try {
      setIsLoading(true);
      await axios.delete(`${BACKEND_URL}/api/note/${note._id}`);
      const remainingNotes = noteList.filter((item, ind) => {
        return ind !== index;
      });
      setNoteList(remainingNotes);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "2%", backgroundColor: "#f5f5f5" }}>
      <Row>
        {noteList && noteList.map((item, index) => {
          return (
            <Col
              key={index}
              sm={6}
              md={3}
              style={{ marginTop: "2%", marginBottom: "2%" }}
            >
              <Card>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "20vh",
                    background: "#F3E496",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "2%",
                    }}
                  >
                    <div style={{ flexGrow: 1 }}>
                      {`Notes ${index + 1}`}
                    </div>
                    <span
                      className="delete-btn"
                      onClick={() => onDeleteNote(index)}
                    >
                      X
                    </span>
                  </div>
                  <div style={{ flexGrow: 1, overflowY: "auto" }}>
                    <h4 style={{ padding: "2%" }}>{item.content}</h4>
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default NotesList;
