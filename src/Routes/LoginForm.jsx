import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { auth } from '../JS Files/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import toast,{ Toaster } from 'react-hot-toast';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signing up");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
      const user = userCredential.user;
      console.log(user);
      console.log("Signed up");
    } catch (error) {
      const errorMessage = error.message;
      toast.error("Email/Password is incorrect");
    }
  };

  return (
    <Container>
      <Toaster/>
      <Box sx={{ py: 5, textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            autoComplete=''
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            required
            autoComplete=''
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
