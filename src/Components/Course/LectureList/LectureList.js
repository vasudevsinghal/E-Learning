import LectureListItem from "./LectureListItem";
import { Container } from "react-bootstrap";
import React from "react";
import "./notepad.css";

const LectureList = (props) => {
  return (
    <div>
      <Container
        fluid
        className={window.innerWidth > 992 ? `scroll-within-y` : ""}
        style={{ backgroundColor: "#f5f5f5" }}
      >
        {Object.entries(props.lectures).map(([lectureNumber, videos]) => (
          <LectureListItem
            lecture={videos}
            lectureNumber={lectureNumber}
            key={lectureNumber}
          />
        ))}
      </Container>
    </div>
  );
};

export default LectureList;
