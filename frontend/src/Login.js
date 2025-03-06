import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const { username, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/login/', formData)
      .then(response => {
        const token = response.data.access;
        // Save the JWT token in localStorage (or manage it with state/context)
        localStorage.setItem('token', token);
        setMessage('Login successful!');
      })
      .catch(error => {
        console.error(error);
        setMessage('Login failed.');
      });
  };

  return (
    <div>
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={onSubmit}>
        <input type="text" name="username" placeholder="Username" value={username} onChange={onChange} required />
        <input type="password" name="password" placeholder="Password" value={password} onChange={onChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;