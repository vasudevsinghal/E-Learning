import CourseList from "./CourseList";
import OngoingCourseListItemProfessor from "../OngoingCourseListItem/OngoingCourseListItemProfessor";

const CourseListProfessor = (props) => {

    const { courses, courseCategory, isOngoing } = props;

    const content = 
        courses.map((course) => {
                return (
                    <OngoingCourseListItemProfessor
                        key={course._id}
                        title={course.title}
                        creator={course.creator}
                        numEnrolledStudents={course.numEnrolledStudents}
                        courseId={course._id}
                    />
                );
            }
        );
    return <CourseList
        courseCategory={courseCategory}
        courses={courses}
        isOngoing={isOngoing}
        courseListContent={content}
    />
}

export default CourseListProfessor;