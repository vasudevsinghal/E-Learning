import { useContext, useState } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { Link , useNavigate } from "react-router-dom";
import loginSignupBackground from '../Assets/Images/loginSignupBackground.png';
import axios from 'axios';
import AuthContext from '../store/auth-context';
import BACKEND_URL from '../url';

const ROW_STYLE = {
    backgroundImage: `url(${loginSignupBackground})`
};


const Login = (props) => {

    const authCtx = useContext(AuthContext);

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [role, setRole] = useState('student');

    const onEmailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    }
    const onPasswordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    }
    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            const enteredData = {
                email: enteredEmail,
                password: enteredPassword,
                role: role
            };

            setError(null);
            setIsLoading(true);

            const response = await axios.post(`${BACKEND_URL}/api/auth/login`, enteredData);
            const responseData = response.data;
            if(responseData.success){
                if(!responseData.verified) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${responseData.token}`;
                    navigate('/verification/email', {replace: true});
                } else {
                    authCtx.loginHandler(responseData.token, responseData.role);
                    navigate('/', {replace: true});
                }
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
                        <Col className={`text-center mx-3 pb-2 ${role === 'student'? 'text-primary border-bottom border-2 border-primary fw-bold': 'text-muted'}`} style={{cursor: 'pointer'}} onClick={() => {
                            setRole('student');
                        }}>
                            Student
                        </Col>
                        <Col className={`text-center mx-3 pb-2 ${role === 'professor'? 'text-primary border-bottom border-2 border-primary fw-bold': 'text-muted'}`} style={{cursor: 'pointer'}} onClick={() => {
                            setRole('professor');
                        }}>
                            Professor
                        </Col>
                    </Row>
                    <Row className='fs-2 py-1 fw-bold justify-content-center'>
                        Login
                    </Row>
                    <Row className='fs-6 justify-content-center m-0'>
                        <p className={`text-center`}>Hello {role}!</p>
                    </Row>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='required'>Email</Form.Label>
                        <Form.Control onChange={onEmailChangeHandler} required type="email" placeholder="Enter email" value={enteredEmail} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className='required'>Password</Form.Label>
                        <Form.Control onChange={onPasswordChangeHandler} required type="password" placeholder="Password" value={enteredPassword} />
                        <Form.Text className="text-muted">
                            Your Password must be atleast 8 characters long.
                        </Form.Text>
                    </Form.Group>
                    {error && <Row className='justify-content-center text-danger my-2'>{error}</Row>}
                    {isLoading && <Row className='justify-content-center my-2'><Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner></Row>}
                    <Button variant="outline-primary" type="submit">
                        Login
                    </Button>
                    <Row className='pt-2 px-0 text-muted'>
                        <Container>
                            Not registered? Please <Link to='/signup' className='p-0'>sign up</Link>
                        </Container>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
}

export default Login;