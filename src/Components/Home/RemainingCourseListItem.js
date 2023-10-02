import axios from "axios";
import { Row, Col, Image, Button } from "react-bootstrap";
import defaultProfilePicture from '../../Assets/Images/defaultProfilePicture.jpg'
import BACKEND_URL from "../../url";


const RemainingCourseListItem = (props) => {
    
    const enrollHandler = async () => {
        try {
            const response = await axios.patch(`${BACKEND_URL}/api/course/enroll/${props.courseId}`);
        } catch(err) {
            console.log(err);
        }
        props.enrollCourse(props.courseId);
    }

    return (
        <Row className='p-2 border-bottom border-dark-30'>
            <Col xs={3} sm={2} className='d-flex align-items-center p-0 justify-content-center'>
                <Image height={65} src={defaultProfilePicture} roundedCircle className='border border-dark'></Image>
            </Col>
            <Col xs={6} sm={7} lg={8} className='p-0'>
                <Row className='fs-5 fw-bold'>
                    {props.title}
                </Row>
                <Row className='fs-6 text-black-50'>
                    {props.creator.fullName}
                </Row>
                <Row>
                    <Col className='p-0 col-auto'>
                        <i className="bi bi-people-fill"></i>
                    </Col>
                    <Col>
                        {props.numEnrolledStudents}
                    </Col>
                </Row>
            </Col>
            <Col xs={3} lg={2} className='d-flex p-0 align-items-center justify-content-center'>
                <Button onClick={enrollHandler} size='md' variant="outline-success">Enroll</Button>
            </Col>
        </Row>

    )
}

export default RemainingCourseListItem;