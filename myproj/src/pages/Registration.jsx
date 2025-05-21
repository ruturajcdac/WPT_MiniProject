// src/pages/Registration.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';
import axios from 'axios'; // Make sure this is imported
import api from '../../src/api'; // Adjust path as needed

import regImg from "../images/register.jpg"; 
import './Registration.css'; // Adjust path as needed

// Define the validation schema using Yup
const registrationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Email must be a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/api/register', data);
      console.log('Registration successful:', response.data);
      alert('Registration successful!'); // Simple feedback for now
      reset(); // Clear the form after successful submission
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      alert(`Registration failed: ${error.response?.data?.message || error.message}`);
    }
  };

//   return (
//     <div className="container">
//       <h1>Registration</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="form-group">
//         <div className="form-floating mb-3">
//           <input
//             type="text"
//             className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
//             id="firstName"
//             placeholder="First Name"
//             {...register('firstName')}
//           />
//           <label htmlFor="firstName">First Name</label>
//           {errors.firstName && (
//             <div className="invalid-feedback">{errors.firstName.message}</div>
//           )}
//         </div>

//         <div className="form-floating mb-3">
//           <input
//             type="text"
//             className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
//             id="lastName"
//             placeholder="Last Name"
//             {...register('lastName')}
//           />
//           <label htmlFor="lastName">Last Name</label>
//           {errors.lastName && (
//             <div className="invalid-feedback">{errors.lastName.message}</div>
//           )}
//         </div>

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

//         <div className="form-floating mb-3">
//           <input
//             type="password"
//             className={`form-control ${
//               errors.confirmPassword ? 'is-invalid' : ''
//             }`}
//             id="confirmPassword"
//             placeholder="Confirm Password"
//             {...register('confirmPassword')}
//           />
//           <label htmlFor="confirmPassword">Confirm Password</label>
//           {errors.confirmPassword && (
//             <div className="invalid-feedback">
//               {errors.confirmPassword.message}
//             </div>
//           )}
//         </div>

//         <Button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Submitting...' : 'Register'}
//         </Button>
//       </form>
//     </div>
//   );
// }

return (

    <div className="main-container">
    {/* left container starts  */}
      <div className="left-container">
        <h1>Escape the ordinary </h1>
        <p className="sub">Reliable rides for every meeting</p>
        <img src={regImg} alt="Registration" className="reg-image" />
      </div>
      {/* left container end here  */}
      <div className="right-container">
      {/* right container start here   */}
        <h1>Create Your Account </h1>
        <p className="sub">Join our community and unlock amazing features!</p>
        <form onSubmit={handleSubmit(onSubmit)} className="reg-form">
          <div className="form-floating mb-3">
            <input
              type="text"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              id="firstName"
              placeholder="First Name"
              {...register("firstName")}
            />
            <label htmlFor="firstName">First Name</label>
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName.message}</div>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              id="lastName"
              placeholder="Last Name"
              {...register("lastName")}
            />
            <label htmlFor="lastName">Last Name</label>
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName.message}</div>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              placeholder="Email"
              {...register("email")}
            />
            <label htmlFor="email">Email</label>
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              placeholder="Password"
              {...register("password")}
            />
            <label htmlFor="password">Password</label>
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className={`form-control ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
              id="confirmPassword"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            {errors.confirmPassword && (
              <div className="invalid-feedback">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="btn-primary btn-lg btn-block"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
        {/* right container end here  */}
      </div>
    </div>
  );
}


export default Registration;