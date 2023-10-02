import { Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import defaultProfilePicture from "../../../Assets/Images/defaultProfilePicture.jpg";
import "react-circular-progressbar/dist/styles.css";

const OngoingCourseListItem = (props) => {

    const { courseId, title, creator, numEnrolledStudents, progressBarContent, notification } = props;
    const navigate = useNavigate();

    const courseRedirectHandler = async () => {
        navigate(`/course/${courseId}/video`);
    };

    return (
        <Row
            
            className="p-2 border-bottom border-dark-30 align-items-center hover-overlay"
        >
            <Col
                onClick={courseRedirectHandler}
                xs={3}
                sm={2}
                className="d-flex align-items-center p-0 justify-content-center"
            >
                <Image
                    height={65}
                    src={defaultProfilePicture}
                    roundedCircle
                    className="border border-dark"
                ></Image>
            </Col>
            <Col xs={6} sm={7} lg={8} className="p-0" onClick={courseRedirectHandler}>
                <Row className="fs-5 fw-bold">
                {title}
                </Row>
                {creator && <Row className="fs-6 text-black-50">{creator.fullName}</Row>}
                <Row>
                    <Col className="p-0 col-auto">
                        <i className="bi bi-people-fill"></i>
                    </Col>
                    <Col>{numEnrolledStudents}</Col>
                </Row>
            </Col>
            {progressBarContent}
            {notification}
        </Row>
    );
};

export default OngoingCourseListItem;
