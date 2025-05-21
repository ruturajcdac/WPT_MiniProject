// src/pages/Login.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './login.css';
import loginVideo from '../images/logg.mp4';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Email must be a valid email address'),
  password: yup.string().required('Password is required'),
});

function Login({ onLoginSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/api/login', data);
      console.log('Login response:', response.data); // Debug the response
      const { user } = response.data; // Destructure user from response.data
      const token = user.token; // Extract token from user
      localStorage.setItem('token', token); // Store the token
      onLoginSuccess(user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      alert(`Login failed: ${error.response?.data?.message || error.message}`);
    }
  };

//   return (
//     <div className="container">
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="form-group">
//         <div className="form-floating mb-3">
//           <input
//             type="email"
//             className={`form-control ${errors.email ? 'is-invalid' : ''}`}
//             id="email"
//             placeholder="Email"
//             {...register('email')}
//           />
//           <label htmlFor="email">Email</label>
//           {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
//         </div>

//         <div className="form-floating mb-3">
//           <input
//             type="password"
//             className={`form-control ${errors.password ? 'is-invalid' : ''}`}
//             id="password"
//             placeholder="Password"
//             {...register('password')}
//           />
//           <label htmlFor="password">Password</label>
//           {errors.password && (
//             <div className="invalid-feedback">{errors.password.message}</div>
//           )}
//         </div>

//         <Button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Logging in...' : 'Login'}
//         </Button>
//       </form>
//     </div>
//   );
// }

return (
    <div className="main-container">
    {/* left container start  */}
      <div className="left-container">
        <video src={loginVideo} autoPlay loop muted className="login-video" />
      </div>
      {/* right constainer starts here  */}
      <div className="right-container">
        <h1>Login to your account</h1>
        <p>Enter your registered email ID and password</p>
        <form onSubmit={handleSubmit(onSubmit)} className="form-group">
          <div className="form-floating mb-3">
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              placeholder="Email"
              {...register('email')}
            />
            <label htmlFor="email">Email</label>
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              placeholder="Password"
              {...register('password')}
            />
            <label htmlFor="password">Password</label>
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <Button type="submit" className="btn w-100" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        {/* right container end here  */}
      </div>
    </div>
  );
}

export default Login;