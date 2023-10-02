import { Row, Col, Card, Spinner, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";
import BACKEND_URL from "../../../url";
import axios from "axios";
import { Chip } from "@mui/material";

const PAGE_SIZE = 5;

const RecommendationsList = ({ videoId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [fullyFetched, setFullyFetched] = useState(false);
  const navigate = useNavigate();

  const getRecommendations = async () => {
    try {
      setIsFetching(true);
      const res = await axios.get(
        `${BACKEND_URL}/api/video/${videoId}/recommendations?items=${PAGE_SIZE}&offset=${offset}`
      );
      setIsFetching(false);
      setRecommendations([...recommendations, ...res.data.relatedVideos]);
      setFullyFetched(res.data.relatedVideos.length < PAGE_SIZE);
    } catch (err) {
      console.log(err);
    }
  };

  const onRecommendationClick = async (item) => {
    try {
      await axios.patch(`${BACKEND_URL}/api/video/watch/${item._id}`);
      navigate(`/course/${item.course}/video/${item._id}`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setOffset(0);
    setIsFetching(false);
    setFullyFetched(false);
    setRecommendations([]);
  }, [videoId]);

  useEffect(() => {
    getRecommendations();
  }, [offset]);
  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <Row>
        {recommendations.map((item, index) => {
          return (
            <Col
              key={`${item.url}${index}`}
              sm={6}
              md={3}
              style={{ marginTop: "2%", marginBottom: "2%" }}
            >
              {index === recommendations.length - 1 && !fullyFetched && (
                <Waypoint
                  onEnter={() => {
                    setOffset(offset + PAGE_SIZE);
                  }}
                />
              )}
              <Card
                className={"flex-row flex-sm-column h-100"}
                onClick={() => {
                  onRecommendationClick(item);
                }}
                style={{ cursor: "pointer" }}
              >
                <Card.Img
                  variant="top"
                  src={`http://img.youtube.com/vi/${item.url.substring(
                    item.url.lastIndexOf("/") + 1
                  )}/0.jpg`}
                  className={"rounded"}
                />
                <Card.Body className={"w-100 h-100 d-flex flex-column"}>
                  <Card.Title>{item.title}</Card.Title>
                  <Stack className={"flex-grow-1"} />
                  <Stack direction={"horizontal"}>
                    <Stack className={"flex-grow-1"} />
                    <Chip
                      label={item.watched ? "Watched" : "Not Watched"}
                      size="small"
                      color={item.watched ? "success" : "error"}
                      style={{ marginRight: "5px" }}
                    />
                  </Stack>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
        {isFetching && (
          <Col
            key={`spinner`}
            sm={6}
            md={3}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner
              style={{ width: "4rem", height: "4rem" }}
              animation="border"
              size="lg"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default RecommendationsList;
