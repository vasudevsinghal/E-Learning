import { Row, Placeholder } from 'react-bootstrap'

const UserPlaceholder = () => (
    // <Container className='d-flex align-items-center flex-column'>
        <Placeholder animation='glow'>
            <Row className='justify-content-center mt-3'>
                <Placeholder size="lg" xs={3}>
                </Placeholder>
            </Row>
            <Row className='justify-content-center'>
                <Placeholder xs={5} className='mt-2'>
                </Placeholder>
            </Row>
        </Placeholder>
    // </Container>
)

export default UserPlaceholder;