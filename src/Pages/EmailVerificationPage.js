import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Container, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import BACKEND_URL from '../url';

const EmailVerificationPage = (props) => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const sendAgainHandler = async (event) => {
        event.preventDefault();
        await sendMail();
    }

    const sendMail = async () => {
        try {
            setIsLoading(true);
            await axios.get(`${BACKEND_URL}/api/auth/verify/mail/send`);
        } catch(err) {
            setError('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        sendMail();
    }, []);

    const clickHandler = () => {
        navigate('/login', {replace: true});
    }

    return (
        <Row className='min-vh-100 align-items-center justify-content-center'>
            {isLoading &&
            <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>
            }
            {!isLoading && error && 
            <Container className='d-flex flex-column justify-content-center align-items-center'>
                <Row className='text-danger fs-1 fw-bold justify-content-center mb-4'>
                    {error}
                </Row>
                <Button variant='outline-primary' className='fs-6 fw-bold' onClick={clickHandler}>Login Again</Button>
            </Container>
            }
            {!isLoading && !error && <Row>
                <Col xs={12} className='fs-2 py-2 fw-bold text-center'>
                    A verification mail has been sent to your registered email address.
                </Col>
                <Col xs={12}className='d-flex fs-4 py-2 text-black-50 justify-content-center'>
                    Did not receive Email? <Link className='ms-2' onClick={sendAgainHandler}> Send Again</Link>
                </Col>
            </Row>}
        </Row>
    )

}

export default EmailVerificationPage;