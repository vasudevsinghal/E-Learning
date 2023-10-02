import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import BACKEND_URL from "../../../url";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

const VideoListItem = (props) => {
  const videoTitleText = `${props.video.videoNumber}. ${props.video.title}`;
  const videoDuration = `${props.video.duration}`;
  const [isWatched, setIsWatched] = useState(props.video.watched);
  const params = useParams();
  const navigate = useNavigate();
  const changeHandler = async (event) => {
    try {
      const urlPath = event.target.checked ? "watch" : "unwatch";
      setIsWatched((prevState) => !prevState);
      await axios.patch(
        `${BACKEND_URL}/api/video/${urlPath}/${props.video._id}`
      );
      setIsWatched(event.target.checked);
    } catch (err) {
      console.log(err);
    }
  };

  const onClickHandler = async () => {
    try {
      await axios.patch(`${BACKEND_URL}/api/video/watch/${props.video._id}`);
      setIsWatched(true);
      navigate(`/course/${params.courseId}/video/${props.video._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Row className="py-1 px-0 hover-overlay">
      <Col className="p-0" xs={1}>
        <Form.Check
          checked={isWatched}
          onChange={changeHandler}
          className="fs-6 ms-2"
          aria-label="option 1"
        />
      </Col>
      <Col xs={10} className="fs-6 p-0" onClick={onClickHandler}>
        <Row>{videoTitleText}</Row>
        <Row className="h6 text-black-50">
          <Col className="col-auto p-0 mx-1">
            <i className="bi bi-play-circle-fill"></i>
          </Col>
          <Col className="p-0">
            <small>{videoDuration}</small>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default VideoListItem;
