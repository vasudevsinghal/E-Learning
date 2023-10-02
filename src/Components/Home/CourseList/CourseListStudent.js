import CourseList from "./CourseList";
import RemainingCourseListItem from "../RemainingCourseListItem";
import OngoingCourseListItemStudent from "../OngoingCourseListItem/OngoingCourseListItemStudent";

const CourseListStudent = (props) => {

    const { courses, courseCategory, isOngoing } = props;

    const content = 
        courses.map((course) => {
            if (isOngoing) {
                return (
                    <OngoingCourseListItemStudent
                        key={course._id}
                        title={course.title}
                        creator={course.creator}
                        numEnrolledStudents={course.numEnrolledStudents}
                        progress={course.progress}
                        courseId={course._id}
                    />
                );
            } else {
                return (
                    <RemainingCourseListItem
                        key={course._id}
                        enrollCourse={props.enrollCourse}
                        title={course.title}
                        creator={course.creator}
                        numEnrolledStudents={course.numEnrolledStudents}
                        courseId={course._id}
                    />
                );
            }
        });
    return <CourseList
        courseCategory={courseCategory}
        courses={courses}
        isOngoing={isOngoing}
        courseListContent={content}
    />
}

export default CourseListStudent;