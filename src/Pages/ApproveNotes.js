import { useContext } from 'react';
import React, { useState,  } from "react";
import AuthContext from '../store/auth-context';
import { useParams } from "react-router";
import ProfessorApproveNotes from '../Components/ApproveNotes/ProfessorApproveNotes';

const ApproveNotes = () => {
    const authCtx = useContext(AuthContext);
  return (
    <>
      {authCtx.isStudent? <></> : <ProfessorApproveNotes/>}
      {/* <CourseStudent /> */}
    </>

  )
}

export default ApproveNotes;