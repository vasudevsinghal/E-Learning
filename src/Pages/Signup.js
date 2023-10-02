import { useState } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import loginSignupBackground from '../Assets/Images/loginSignupBackground.png';
import axios from 'axios';
import BACKEND_URL from '../url';

const ROW_STYLE = {
    backgroundImage: `url(${loginSignupBackground})`
};

const Signup = (props) => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [discordId, setDiscordId] = useState('');
    const [role, setRole] = useState('student');
    const onEmailChangeHandler = (event) => {
        setEmail(event.target.value);
    }
    const onPasswordChangeHandler = (event) => {
        setPassword(event.target.value);
    }
    const onFullNameChangeHandler = (event) => {
        setFullName(event.target.value);
    }
    const onPhoneNumberChangeHandler = (event) => {
        setPhoneNumber(event.target.value);
    }
    const onDiscordIdChangeHandler = (event) => {
        setDiscordId(event.target.value);
    }


    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const enteredData = {
            fullName,
            email,
            password,
            phoneNumber,
            discordId,
            role
        }
        try {
            setError(null);
            setIsLoading(true);
            const response = await axios.post(`${BACKEND_URL}/api/auth/signup`, enteredData);
            const responseData = response.data;
            if (responseData.success) {
                navigate('/login', {replace: true});
            }
        } catch (err) {
            console.log(err);
            setError(err.response.data.error?.message || err.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Row style={ROW_STYLE} className='min-vh-100 align-items-center justify-content-center bg'>
            <Col xs={11} sm={9} md={6} lg={4}>
                <Form onSubmit={onSubmitHandler} className='border my-5 border-dark-50 p-4 shadow-lg rounded-3 bg-white'>
                    <Row className=''>
                        <Col className={`text-center mx-3 pb-2 ${role === 'student' ? 'text-primary border-bottom border-2 border-primary fw-bold' : 'text-muted'}`} style={{ cursor: 'pointer' }} onClick={() => {
                            setRole('student');
                        }}>
                            Student
                        </Col>
                        <Col className={`text-center mx-3 pb-2 ${role === 'professor' ? 'text-primary border-bottom border-2 border-primary fw-bold' : 'text-muted'}`} style={{ cursor: 'pointer' }} onClick={() => {
                            setRole('professor');
                        }}>
                            Professor
                        </Col>
                    </Row>
                    <Row className='fs-2 py-2 fw-bold justify-content-center'>
                        Signup
                    </Row>
                    <Form.Group className="mb-3" controlId="formBasicFullName">
                        <Form.Label className='required'>Full Name</Form.Label>
                        <Form.Control onChange={onFullNameChangeHandler} required type="text" placeholder="Enter Full Name" value={fullName} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='required'>Email</Form.Label>
                        <Form.Control onChange={onEmailChangeHandler} required type="email" placeholder="Enter Email" value={email} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className='required'>Password</Form.Label>
                        <Form.Control onChange={onPasswordChangeHandler} required type="password" placeholder="Enter Password" value={password} />
                        <Form.Text className="text-muted">
                            Your Password must be atleast 8 characters long.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control onChange={onPhoneNumberChangeHandler} type="text" placeholder="Enter Phone Number" value={phoneNumber} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDiscordId">
                        <Form.Label>Discord Id</Form.Label>
                        <Form.Control onChange={onDiscordIdChangeHandler} type="text" placeholder="Enter Discord Id" value={discordId} />
                    </Form.Group>
                    {error && <Row className='justify-content-center text-danger my-2'>{error}</Row>}
                    {isLoading && <Row className='justify-content-center my-2'><Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner></Row>}
                    <Button variant="outline-primary" type="submit">
                        Signup
                    </Button>
                    <Row className='pt-2 px-0 text-muted'>
                        <Container>
                            Already registered? Please <Link to='/login' className='p-0'>login</Link>
                        </Container>
                    </Row>
                </Form>
            </Col>
        </Row>
    )
}

export default Signup;