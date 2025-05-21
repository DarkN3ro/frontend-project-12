import React, { useState } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../store/authSlice';
import avatar from '../assets/avatar.jpg';
import routes from '../routes.js';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);

  const handleLogin = async (values, { setSubmitting }) => {
    setAuthError(null);
    try {
      const response = await fetch(routes.loginPath(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Неверные имя пользователя или пароль');
      }

      const data = await response.json();
      dispatch(setToken(data.token));
      navigate('/');
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: ""
      }}
      onSubmit={handleLogin}
    >
      {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body row p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img src={avatar} className="rounded-circle" alt="Enter" />
                  </div>
                  <form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
                  <h1 className="text-center mb-4">Войти</h1>
                  <div className="form-floating mb-3">
              <input
                type="username"
                name="username"
                placeholder="Ваш ник"
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
                value={values.username}
              />
              <label htmlFor="username">Ваш ник</label>
            </div>
            <div className="form-floating mb-4">
              <input
                type="password"
                name="password"
                placeholder="Пароль"
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
                value={values.password}
              />
              <label htmlFor="password">Пароль</label>
              </div>

              {authError && (
                <div className="text-danger mb-3 text-center">
                  {authError}
                </div>
              )}

              <button type="submit" disabled={isSubmitting} className="w-100 mb-3 btn btn-outline-primary">
              Войти
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