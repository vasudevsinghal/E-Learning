import { Container  } from 'react-bootstrap';
import { useState } from 'react';

import BACKEND_URL from "../../../url";
import CourseDetails from "./CourseDetails";
import CourseListProfessor from '../CourseList/CourseListProfessor';

const CourseDetailsProfessor = () => {

    const [ongoingCourses, setOngoingCourses] = useState([]);

    const content = (
        <Container>
            {ongoingCourses.length !== 0 && (
                <CourseListProfessor
                    key="live"
                    courseCategory="Live Courses"
                    isOngoing={true}
                    courses={ongoingCourses}
                />
            )}
        </Container>
    );

    return (
        <CourseDetails 
            coursesContent={content}
            setOngoingCourses={setOngoingCourses}
            ongoingCoursesURL={`${BACKEND_URL}/api/course/my-courses`}
        />
    )
}

export default CourseDetailsProfessor;