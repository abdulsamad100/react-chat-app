import React, { useRef } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../JS Files/Firebase'; 
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();
  const formValues = useRef({
    email: '',
    password: '',
  });

  const signUpUser = async (ev) => {
    ev.preventDefault();
    console.log("Signing up");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formValues.current.email, formValues.current.password);
      await signOut(auth);
      const user = userCredential.user;
      console.log(user);
      console.log("Signed up");
      navigate('/login');
    } catch (error) {
      const errorMessage = error.message;
      console.log(`Error: ${errorMessage}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formValues.current = { ...formValues.current, [name]: value };
    console.log(formValues.current);
  };

  return (
    <Container>
      <Box sx={{ py: 5, textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={signUpUser}>
          <TextField
            fullWidth
            required
            label="Email"
            name="email"
            type="email"
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            required
            label="Password"
            name="password"
            type="password"
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignupForm;
