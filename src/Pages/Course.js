import { useContext } from 'react';
import AuthContext from '../store/auth-context';
import CourseStudent from "../Components/Course/CourseStudent";
import CourseProfessor from "../Components/Course/CourseProfessor";

const Course = (props) => {
  const authCtx = useContext(AuthContext);
  return (
    <>
      {authCtx.isStudent? <CourseStudent /> : <CourseProfessor/>}
      {/* <CourseStudent /> */}
    </>

  )
}

export default Course;