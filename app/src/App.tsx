import { useState, useEffect } from 'react';

import StudentCard from './StudentCard/StudentCard'
import './App.scss'

export default function App() {
  const [students, setStudents] = useState([]);

    useEffect(() => {
      // Fetch data from API
      fetch('http://127.0.0.1:8000/api/addStudent')
        .then(response => response.json())
        .then(data => {
          // Set the received data to the state
          setStudents(data.students);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);

  return (
    <>
      {students.map(student => (
        <StudentCard
          key={student.id}
          cardTitle={`${student.name} ${student.lastname}`}
          cardSubtitle={student.student_ID}
          cardText={`School: ${student.career}, Academy: ${student.curriculum}`}
        />
      ))}
    </>
  )
}