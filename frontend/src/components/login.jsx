import React from 'react';
import { Formik } from 'formik';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
        <div>
          <h1>Hexlet Chat</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
        </div>
      )}
    </Formik>
  );
};

export default Login;