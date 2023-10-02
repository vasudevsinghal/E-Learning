import {
  Container,
  Row,
  Col,
  Tab,
  Tabs,
  Spinner,
  Stack,
} from "react-bootstrap";
import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "../../url";
import YoutubeEmbed from "./YoutubeEmbed";
import LectureList from "./LectureList/LectureList";
import Header from "../../Components/Layout/Header";
import RecommendationsList from "./LectureList/RecommendationsList";
import VideoPlaceholder from "./VideoPlaceholder";
import { Rating } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";
import { Star } from "@mui/icons-material";
import NoteList from "../../Components/Course/Notes/NoteList";
import SharedNotes from "../../Components/Course/Notes/SharedNotes";

const CourseStudent = () => {
  const navigate = useNavigate();
  const params = useParams();

  const courseId = params.courseId;
  const videoId = params.videoId;

  const [isCourseLoading, setIsCourseLoading] = useState(null);
  const [isVideoLoading, setIsVideoLoading] = useState(null);

  const [precision, setPrecision] = useState(1);
  const [iconColor, setIconColor] = useState("#000000");

  const [avgRating, setAvgRating] = useState(undefined);
  const [userRating, setUserRating] = useState(undefined);
  const [ratingCount, setRatingCount] = useState(undefined);

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const [lectureList, setLectureList] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [nextVideo, setNextVideo] = useState(null);
  const [defaultTab, setDefaultTab] = useState(window.innerWidth < 992 ? 5 : 1);

  const changeVideoHandler = (youtubeLink) => {
    const linkList = youtubeLink.split("/");
    const embedId = linkList[linkList.length - 1];
    setCurrentVideo(embedId);
  };

  const handleNextVideoClick = () => {
    navigate(`/course/${nextVideo.course}/video/${nextVideo._id}`);
  };

  const fetchCourseDetails = async () => {
    try {
      setIsCourseLoading(true);
      const fetchedCourseDetails = await axios.get(
        `${BACKEND_URL}/api/course/${courseId}`
      );
      if (!videoId)
        navigate(
          `/course/${courseId}/video/${fetchedCourseDetails.data.videos["2"][0]._id}`
        );
      setLectureList(fetchedCourseDetails.data.videos);
    } catch (err) {
      console.log(err);
    } finally {
      setIsCourseLoading(false);
    }
  };

  const fetchVideoDetails = async () => {
    try {
      setIsVideoLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/video/${videoId}`);
      const fetchedVideoDetails = response.data.video;
      setTitle(fetchedVideoDetails.title);
      setDescription(fetchedVideoDetails.description);
      setNextVideo(fetchedVideoDetails.nextVideo);
      changeVideoHandler(fetchedVideoDetails.url);
    } catch (err) {
      console.log(err);
    } finally {
      setIsVideoLoading(false);
    }
  };

  const fetchRatings = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/rating/${videoId}`);
      setAvgRating(response.data.avgRating);
      setUserRating(response.data.userRating);
      setRatingCount(response.data.count);
      setIconColor(response.data.userRating ? undefined : "#000000");
    } catch (err) {
      console.log(err);
    }
  };

  const onRatingChange = async (event, newValue) => {
    try {
      setAvgRating(undefined);
      if (newValue === null) {
        await axios.delete(`${BACKEND_URL}/api/rating/${videoId}`);
        await fetchRatings();
      } else {
        await axios.post(`${BACKEND_URL}/api/rating/${videoId}`, {
          rating: newValue,
        });
        await fetchRatings();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onRatingActiveChange = (event) => {
    if (event.type === "mousemove") {
      setIconColor(undefined);
      setPrecision(1);
    } else {
      setIconColor(userRating ? undefined : "#000000");
      setPrecision(0.1);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  useEffect(() => {
    if (!videoId) return;
    fetchVideoDetails();
  }, [videoId]);

  useEffect(() => {
    if (!videoId) return;
    fetchRatings();
  }, [videoId, userRating]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Fragment>
      {!isCourseLoading && (
        <Container fluid>
          <Header />
          <Container fluid className="overflow-hidden scroll-within-y">
            <Row>
              <Col xs={12} lg={9} className="p-0 scroll-within-y">
                {!isVideoLoading && (
                  <>
                    <Row>
                      <YoutubeEmbed embedId={currentVideo} />
                    </Row>
                    <Row
                      className={"px-sm-1 px-0"}
                      style={{ paddingBottom: "0.85rem" }}
                    >
                      <Stack
                        direction="horizontal"
                        gap={2}
                        style={{
                          flexWrap: "wrap",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography variant="h5">{title}</Typography>
                        <Stack direction="horizontal" style={{ flexGrow: 1 }}>
                          <div style={{ width: 1, flexGrow: 1 }} />
                          {avgRating !== undefined ? (
                            <Tooltip
                              title={
                                <>
                                  {userRating === undefined ? (
                                    "Rate this video to earn coins!"
                                  ) : (
                                    <>
                                      <b>Your Rating:</b> {userRating}
                                    </>
                                  )}
                                  <br />
                                  <b>Average Rating:</b> {avgRating}
                                  <br />
                                  <b>Number of Ratings:</b> {ratingCount}
                                </>
                              }
                            >
                              <Rating
                                name="rating"
                                value={
                                  userRating === undefined
                                    ? avgRating
                                    : userRating
                                }
                                precision={precision}
                                icon={
                                  <Star
                                    fontSize="inherit"
                                    sx={{
                                      color: iconColor,
                                    }}
                                  />
                                }
                                // Remove bottom
                                sx={{
                                  pb: precision === 1 ? "10px" : 0,
                                  pt: precision === 1 ? "2px" : 0,
                                }}
                                onChange={onRatingChange}
                                onChangeActive={onRatingActiveChange}
                              />
                            </Tooltip>
                          ) : (
                            <Spinner animation="border" size="sm" role="status">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </Spinner>
                          )}
                        </Stack>
                      </Stack>
                    </Row>
                    <Row className={"px-sm-3 pb-4 px-2"}>
                      <button
                        className={`btn btn-primary`}
                        onClick={handleNextVideoClick}
                      >
                        Next Video
                      </button>
                    </Row>
                    <Row className={"px-2 px-sm-3"}>
                      <Tabs
                        defaultActiveKey={defaultTab}
                        id="uncontrolled-tab-example"
                        onSelect={(k) => setDefaultTab(k)}
                      >
                        <Tab eventKey={1} title="Description">
                          <Stack className={"px-3 pt-2 px-sm-0"}>
                            In this video, the following topics have been
                            discussed: {description}
                          </Stack>
                        </Tab>
                        <Tab eventKey={2} title="Recommendations">
                          <RecommendationsList videoId={videoId} />
                        </Tab>
                        <Tab eventKey={3} title="My Notes">
                          <NoteList></NoteList>
                        </Tab>
                        <Tab eventKey={4} title="Shared Notes">
                          <SharedNotes></SharedNotes>
                        </Tab>
                        {windowSize[0] < 992 ? (
                          <Tab
                            eventKey={5}
                            title="Videos"
                            className="d-lg-none"
                          >
                            <LectureList lectures={lectureList} />
                          </Tab>
                        ) : null}
                      </Tabs>
                    </Row>
                  </>
                )}
                {isVideoLoading && <VideoPlaceholder />}
              </Col>
              <Col xs={12} lg={3} className="p-0 d-none d-md-block">
                <LectureList lectures={lectureList} />
              </Col>
            </Row>
          </Container>
        </Container>
      )}
      {isCourseLoading && (
        <Row className="min-vh-100 justify-content-center">
          <Col
            xs={12}
            className="d-flex align-items-end justify-content-center mb-4"
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
          <Col
            xs={12}
            className="d-flex align-items-start justify-content-center fs-3"
          >
            <p className="text-center">
              Hang on while the videos are being loaded...
            </p>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default CourseStudent;
