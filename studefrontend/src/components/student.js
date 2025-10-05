import React, { useEffect, useState } from 'react';
import { TextField, Container, Paper, Button, Typography, Box } from '@mui/material';

export default function Student() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [students, setStudents] = useState([]);

  const paperStyle = {
    padding: '50px 20px', 
    width: 600, 
    margin: "20px auto"
  };

  const handleClick = (e) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim() || !address.trim()) {
      alert('Please fill in both Name and Address fields');
      return;
    }
    
    const student = { name, address };
    console.log('Submitting student:', student);
    
    fetch("http://localhost:8080/api/v1/students/addStudent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    })
    .then(response => {
      console.log('Response status:', response.status);
      if (response.ok) {
        console.log("New Student added successfully");
        alert('Student added successfully!');
        // Clear the form
        setName('');
        setAddress('');
        // Refresh the student list
        fetchStudents();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error("Error adding student:", error);
      alert('Error adding student. Please check if the backend server is running on port 8080.');
    });
  };

  const fetchStudents = () => {
    fetch("http://localhost:8080/api/v1/students/getAll")
      .then(res => res.json())
      .then((result) => {
        setStudents(result);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            color: "blue", 
            textDecoration: "underline", 
            mb: 2,
            textAlign: "center" 
          }}
        >
          Add Student
        </Typography>

        <Box 
          component="form" 
          sx={{ 
            '& > *': { margin: 1 },
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }} 
          noValidate 
          autoComplete="off"
        >
          <TextField 
            id="student-name"
            label="Student Name" 
            variant="outlined" 
            fullWidth 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField 
            id="student-address"
            label="Student Address" 
            variant="outlined" 
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleClick}
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Paper>

      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          mt: 4, 
          mb: 2, 
          textAlign: "center",
          color: "primary.main"
        }}
      >
        Students List
      </Typography>

      <Paper elevation={3} style={paperStyle}>
        {students.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: "center", py: 3 }}>
            No students found. Add a student above to get started.
          </Typography>
        ) : (
          students.map((student) => (
            <Paper 
              elevation={6} 
              sx={{ 
                margin: "10px", 
                padding: "15px", 
                textAlign: "left" 
              }} 
              key={student.id}
            >
              <Typography variant="body1">
                <strong>ID:</strong> {student.id}
              </Typography>
              <Typography variant="body1">
                <strong>Name:</strong> {student.name}
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong> {student.address}
              </Typography>
            </Paper>
          ))
        )}
      </Paper>
    </Container>
  );
}