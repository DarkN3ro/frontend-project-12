import React from 'react';
import { Formik } from 'formik';

const LoginPage = () => {
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
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body row p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img src="/assets/avatar.jpg" className="rounded-circle" alt="Enter"></img>
                  </div>
                <form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
            <h1 className="text-center mb-4">Enter</h1>
            <div className="form-floating mb-3">
            <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
                value={values.email}
              />
            </div>
            <div className="form-floating mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
                value={values.password}
              />
              </div>

              <button type="submit" disabled={isSubmitting} className="w-100 mb-3 btn btn-outline-primary">
                Submit
              </button>
                </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default LoginPage;