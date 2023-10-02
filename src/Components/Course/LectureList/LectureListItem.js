import { useState } from "react";
import Row from "react-bootstrap/Row";
import VideoListItem from "./VideoListItem";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const LectureListItem = (props) => {
  const lectureTitleText = `Lecture - ${props.lectureNumber}`;
  const allVideos = props.lecture.map((video) => (
    <VideoListItem video={video} key={video.videoNumber}></VideoListItem>
  ));
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Row className="p-0">
      <Row className="fs-5 bg-secondary text-white py-1" style={{cursor: 'pointer'}} onClick={() => setShowDropdown(prev => !prev)}>
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: 1 }}>{lectureTitleText}</div>
          {showDropdown ? <BiChevronUp color="#ffffff" /> : <BiChevronDown color="#ffffff" />}
          {/* <box-icon
            name={showDropdown ? "chevron-up" : "chevron-down"}
            type="solid"
            color="#ffffff"
            onClick={() => setShowDropdown(!showDropdown)}
          ></box-icon> */}
        </div>
      </Row>
      {showDropdown ? (
        <Row className="px-1" style={{ backgroundColor: "#f5f5f5" }}>
          {allVideos}
        </Row>
      ) : null}
    </Row>
  );
};

export default LectureListItem;
