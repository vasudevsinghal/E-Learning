import { Row, Col, Placeholder, Image } from "react-bootstrap";

const CoursePlaceholder = () => (
  <Placeholder animation="glow">
    <Placeholder xs={11} size="lg" className="ms-2 mb-2 mt-3" />
    <Row>
      <Placeholder
        as={Image}
        style={{ height: "65px", width: "65px" }}
        className="mx-2"
        roundedCircle
      ></Placeholder>
      <Col
        xs={6}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <Placeholder xs={12} className="mb-2"></Placeholder>
        <Placeholder xs={12}></Placeholder>
      </Col>
    </Row>
    <Row>
      <Placeholder xs={11} size="lg" className="mx-2 mt-2"></Placeholder>
    </Row>
  </Placeholder>
);

export default CoursePlaceholder;
