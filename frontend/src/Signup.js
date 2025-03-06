import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [message, setMessage] = useState('');

  const { username, email, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/signup/', formData)
      .then(response => {
        setMessage('Signup successful!');
      })
      .catch(error => {
        console.error(error);
        setMessage('Signup failed. ' + JSON.stringify(error.response.data));
      });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {message && <p>{message}</p>}
      <form onSubmit={onSubmit}>
        <input type="text" name="username" placeholder="Username" value={username} onChange={onChange} required />
        <input type="email" name="email" placeholder="Email" value={email} onChange={onChange} required />
        <input type="password" name="password" placeholder="Password" value={password} onChange={onChange} required />
        <input type="password" name="password2" placeholder="Confirm Password" value={password2} onChange={onChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;