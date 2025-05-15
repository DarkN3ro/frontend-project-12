import React from 'react';
import { Formik } from 'formik';

const Login = () => {
  return (
    <div>
    <h1>Hexlet Chat</h1>
    <Formik>
        <form>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          <label htmlFor="email">E-mail</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          <label htmlFor="password">Password</label>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
       </form>

    </Formik>
  </div>
  )
};

export default Login;