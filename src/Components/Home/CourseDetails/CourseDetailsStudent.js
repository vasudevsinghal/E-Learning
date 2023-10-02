import { Container } from "react-bootstrap";
import { useState } from "react";

import BACKEND_URL from "../../../url";
import CourseDetails from "./CourseDetails";
import CourseListStudent from "../CourseList/CourseListStudent";

const CourseDetailsStudent = () => {
  const [ongoingCourses, setOngoingCourses] = useState([]);
  const [remainingCourses, setRemainingCourses] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(true);

  const enrollCourse = () => {
    setFetchAgain((prevState) => !prevState);
  };

  const content = (
    <Container>
      {ongoingCourses.length !== 0 && (
        <CourseListStudent
          key="ongoing"
          courseCategory="Ongoing Courses"
          isOngoing={true}
          courses={ongoingCourses}
        />
      )}
      {remainingCourses.length !== 0 && (
        <CourseListStudent
          key="remaining"
          courseCategory="All Courses"
          isOngoing={false}
          courses={remainingCourses}
          enrollCourse={enrollCourse}
        />
      )}
    </Container>
  );

  return (
    <CourseDetails
      coursesContent={content}
      setOngoingCourses={setOngoingCourses}
      setRemainingCourses={setRemainingCourses}
      enrollCourse={enrollCourse}
      fetchAgain={fetchAgain}
      ongoingCoursesURL={`${BACKEND_URL}/api/course/ongoing`}
      remainingCoursesURL={`${BACKEND_URL}/api/course/remaining`}
    />
  );
};

export default CourseDetailsStudent;
