import { useState, useEffect } from "react";

import StudentCard from "./StudentCard/StudentCard";

export default function ListStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch("http://127.0.0.1:8000/api/addStudent")
      .then((response) => response.json())
      .then((data) => {
        // Set the received data to the state
        setStudents(data.students);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = (studentId) => {
    // Make an HTTP DELETE request to your backend API to delete the student
    fetch(`http://127.0.0.1:8000/api/addStudent/${studentId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        // You may need to include authorization headers or any other required headers
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Remove the deleted student from the state
        setStudents(students.filter(student => student.id !== studentId));
      })
      .catch(error => {
        console.error('There was a problem with the delete request', error);
      });
  };

  return (
    <>
      {students.map((student) => (
        <StudentCard
          studentKey={student.id}
          cardTitle={`${student.name} ${student.lastname}`}
          cardSubtitle={student.student_id}
          cardText={`School: ${student.career}, Academy: ${student.curriculum}`}
          onDelete={() => handleDelete(student.id)}
        />
      ))}
    </>
  );
}

