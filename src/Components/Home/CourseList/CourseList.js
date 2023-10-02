import { Button, Row } from "react-bootstrap";

const CourseList = (props) => {
  const { courseCategory, courseListContent, isOngoing } = props;

  return (
    <Row>
      <Row className="fs-5 bg-secondary text-white px-3 py-1">
        <div
          className={
            "d-flex flex-row w-100 justify-content-between align-items-center"
          }
        >
          {courseCategory}
          {isOngoing && (
            <Button
              variant="outline-light"
              size={"sm"}
              href={"/knowledgeGraph"}
            >
              See Knowledge Graph
            </Button>
          )}
        </div>
      </Row>
      {courseListContent}
    </Row>
  );
};

export default CourseList;
