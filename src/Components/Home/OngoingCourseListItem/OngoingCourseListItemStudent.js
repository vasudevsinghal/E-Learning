import OngoingCourseListItem from "./OngoingCourseListItem";
import { CircularProgressbar } from "react-circular-progressbar";
import { Col, Container} from "react-bootstrap";

const OngoingCourseListItemStudent = (props) => {

    const {
        title,
        creator,
        numEnrolledStudents,
        progress,
        courseId
    } = props;

    const content = <Col
            xs={3}
            lg={2}
            className="d-flex p-0 align-items-center justify-content-center"
        >
            <Container
                className=" d-flex align-items-center pe-3"
                style={{ height: "80px", width: "80px" }}
            >
                <CircularProgressbar
                    className="fw-bold"
                    value={props.progress.toFixed("2")}
                    text={`${props.progress.toFixed("2")}%`}
                    strokeWidth={12}
                />
            </Container>
        </Col>
    
    return <OngoingCourseListItem 
        key={courseId}
        title={title}
        creator={creator}
        numEnrolledStudents={numEnrolledStudents}
        progress={progress}
        courseId={courseId}
        progressBarContent={content}
    />
}

export default OngoingCourseListItemStudent;