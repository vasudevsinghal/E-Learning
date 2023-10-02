import OngoingCourseListItem from "./OngoingCourseListItem";
import { Col, Container} from "react-bootstrap";
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { useNavigate } from "react-router-dom";

const OngoingCourseListItemProfessor = (props) => {
    const {
        title,
        numEnrolledStudents,
        courseId
    } = props;
    const navigate = useNavigate();

    const redirect = () => {
        console.log(props.courseId);
        navigate(`/approvenotes/${courseId}`);
    }

    const content = <Col
            xs={3}
            lg={2}
            className="d-flex p-0 align-items-center justify-content-center"
        >
            <Container
                className=" d-flex align-items-center pe-3"
                style={{ height: "80px", width: "80px" }}
            >
                <NotificationsRoundedIcon onClick={redirect}/>
            </Container>
        </Col>

    return (
    <>
        <OngoingCourseListItem
        key={courseId}
        title={title}
        numEnrolledStudents={numEnrolledStudents}
        courseId={courseId}
        notification = {content}
        />
    </>
    );
}

export default OngoingCourseListItemProfessor;