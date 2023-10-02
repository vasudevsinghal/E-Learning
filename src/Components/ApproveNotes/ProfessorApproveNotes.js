import { useContext } from 'react';
import React, { useState,  } from "react";
import NotesList from "./NotesList"
import Header from "../Layout/Header"

const ProfessorApproveNotes = () => {
    
    return (
        <>
        <Header />
        <NotesList />
        </>
    );

}

export default ProfessorApproveNotes;