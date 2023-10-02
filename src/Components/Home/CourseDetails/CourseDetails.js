import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import CoursePlaceholder from "../CoursePlaceholder";

const CourseDetails = (props) => {
  const {
    ongoingCoursesURL,
    remainingCoursesURL,
    coursesContent,
    setOngoingCourses,
    setRemainingCourses,
    fetchAgain,
  } = props;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const ongoingCoursesPromise = await axios.get(ongoingCoursesURL);
        let fetchedResult;
        if (!remainingCoursesURL) {
          fetchedResult = await Promise.all([ongoingCoursesPromise]);
        } else {
          const remainingCoursesPromise = await axios.get(remainingCoursesURL);
          fetchedResult = await Promise.all([
            ongoingCoursesPromise,
            remainingCoursesPromise,
          ]);
          setRemainingCourses(fetchedResult[1].data.courses);
        }
        setOngoingCourses(fetchedResult[0].data.courses);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [fetchAgain]);

  return (
    <Fragment>
      {!isLoading && coursesContent}
      {isLoading && <CoursePlaceholder />}
    </Fragment>
  );
};

export default CourseDetails;
