import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './UserDetails.module.css';
import axios from 'axios';
import defaultProfilePicture from '../../Assets/Images/defaultProfilePicture.jpg';
import { useEffect, useState, Fragment } from 'react';
import BACKEND_URL from '../../url';
import UserPlaceholder from './UserPlaceholder';
import { ReactComponent as GoldBadge } from '../../Assets/Images/gold.svg';
import Badge from '../Leaderboard/Badge';
const UserDetails = props => {
    const [userDetails, setUserDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                setIsLoading(true);
                const fetchedResult = await axios.get(`${BACKEND_URL}/api/student`);
                const fetchedUserDetails = fetchedResult.data;
                setUserDetails(fetchedUserDetails);
            } catch(err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchUserDetails();
    }, []);


    return (
        <Container fluid className='py-5'>
            <Row className="justify-content-center">
                <Col className="d-flex justify-content-center">
                    <Image className="border border-dark" width={200} height={200} src={defaultProfilePicture} roundedCircle/>
                </Col>
            </Row>

            {!isLoading &&
            <Fragment>
                <Row className="justify-content-center fs-3 fw-bold pt-3 pb-2">
                {userDetails.fullName}
                </Row>
                <Row className={`justify-content-center text-black-50 fs-6 ${styles['wrap-container']}`}>
                    {userDetails.email}
                </Row>
                <Row className={`d-flex justify-content-center fs-5 `}>
                    <Col xs="auto" className="px-4 fw-bold">
                        Rank: {userDetails.rank}
                    </Col>
                    <Col xs="auto" className="px-4 fw-bold">
                        Badge: <Badge badgeName={userDetails.badge} />
                    </Col>
                </Row>
            </Fragment>}
             {isLoading && <UserPlaceholder />}
        </Container>
    );
}

export default UserDetails;