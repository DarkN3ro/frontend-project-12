import React from 'react';
import { Formik } from 'formik';

const Login = () => {
  return (
    <div>
      <h1>Hexlet Chat</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          console.log('Form Submitted', values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="email">E-mail</label>
            <Field
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
            />
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;