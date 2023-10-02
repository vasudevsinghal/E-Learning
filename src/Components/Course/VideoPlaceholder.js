import styles from './VideoPlaceholder.module.css'
import { Row, Placeholder, Col, Image, Button, Tabs, Card } from 'react-bootstrap';
const VideoPlaceholder = () => (
    <Placeholder animation="glow">
        <Row>
            <Placeholder style={{
                width: "99%",
                aspectRatio: "16/9",
                margin: "5px"
            }} />
        </Row>
        <Row style={{ padding: "1% 2% 2% 2%" }}>
            {/* <button className={`btn btn-primary`} onClick={handleNextVideoClick}>Next Video</button> */}
            <Placeholder.Button varient='primary' />
        </Row>

        <Row style={{ padding: "0% 2% 2% 2%" }}>
            <Placeholder.Button xs={4} lg={2} bg="secondary" className={`mx-2`} />
            <Placeholder.Button xs={4} lg={2} bg="secondary" className={`mx-2`} />
        </Row>
        <Row className={`d-flex justify-content-around pb-3`}>
            
            <Card className={`m-2 ${styles['card-container']}`}>
                <Placeholder as={Image} style={{height : '10rem'}} className={`m-1`}/>
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                </Card.Body>
            </Card>
            <Card className={`m-2 ${styles['card-container']}`}>
                <Placeholder as={Image} style={{height : '10rem'}} className={`m-1`}/>
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                </Card.Body>
            </Card>
            <Card className={`m-2 ${styles['card-container']}`}>
                <Placeholder as={Image} style={{height : '10rem'}} className={`m-1`}/>
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                </Card.Body>
            </Card>
            <Card className={`m-2 ${styles['card-container']}`}>
                <Placeholder as={Image} style={{height : '10rem'}} className={`m-1`}/>
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                </Card.Body>
            </Card>
        </Row>
    </Placeholder>
);

export default VideoPlaceholder;