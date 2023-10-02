import { useEffect, useState } from 'react';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import BACKEND_URL from '../url';
import { useLocation } from 'react-router';

const EmailVerificationPage = (props) => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const params = queryString.parse(location.search);

    const clickHandler = () => {
        navigate('/login', {replace: true});
    }

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/auth/verify/mail?id=${params.id}&token=${params.token}`)
                setMessage(response.data.message)
            } catch(err) {
                console.log(err);
                setError('Something went wrong.');
            } finally {
                setIsLoading(false);
            }
        }
        confirmEmail();
    }, [params.id, params.token]);

    const confirmationContent = (
    <Row className='text-success'>
        <Col xs={12} className='fs-2 py-2 fw-bold text-center'>
            {message}
        </Col>
        <Col xs={12}className='d-flex fs-4 py-2 text-black-50 justify-content-center'>
        <Button variant='outline-primary' className='fs-6 fw-bold' onClick={clickHandler}>Login</Button>
        </Col>
    </Row>
    );

    const loadingContent = (
        <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>
    )

    const errorContent = (
        <Row className='text-danger'>Something went wrong. Please try again later!</Row>
    )

    return (
        <Row className='min-vh-100 align-items-center justify-content-center'>
            {isLoading && loadingContent}
            {error && errorContent}
            {!isLoading && !error && confirmationContent}
        </Row>
    )
}

export default EmailVerificationPage;