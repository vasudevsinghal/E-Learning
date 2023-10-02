import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CourseDetailsStudent from '../Components/Home/CourseDetails/CourseDetailsStudent';
import UserDetails from '../Components/Home/UserDetails';
import AuthContext from '../store/auth-context';
import CourseDetailsProfessor from '../Components/Home/CourseDetails/CourseDetailsProfessor';

const Home = (props) => {
    const authCtx = useContext(AuthContext);
    console.log(authCtx.isStudent)
    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={4} className='p-0'>
                    <UserDetails />
                </Col>
                <Col xs={12} md={8} className='p-0'>
                    {authCtx.isStudent? <CourseDetailsStudent />: <CourseDetailsProfessor />}
                </Col>
            </Row>
        </Container>
    );
};

export default Home;