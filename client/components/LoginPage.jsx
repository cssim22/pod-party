import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Button, CssBaseline, TextField } from '@material-ui/core';
import { flexbox } from '@material-ui/system';



const LoginPage = (props) => {

  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    fetch(form.action, {
      method: form.action,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        password
      })
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log('Error in sending username and email', err);
      });
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (

    <div style={{ width: '100%' }}>

      <Box display="flex" justifyContent="center" alignItems="center">
        <form id='LoginForm' method="POST" action="/login" onSubmit={handleSubmit}>
          <TextField label='Username' name='username' variant="outlined" onChange={handleUsername}></TextField><br></br>
          <TextField label='Password' type='password' name='password' variant="outlined" onChange={handlePassword}></TextField><br></br>
          <Button type='submit' variant="outlined">Sign Up</Button>
          <Button type='submit' variant="outlined">Sign In</Button>
        </form>
      </Box>

    </div>

  );
};

export default LoginPage;