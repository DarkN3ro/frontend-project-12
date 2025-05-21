import React, { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';
import avatar from '../assets/avatar.jpg';
import routes from '../routes.js';

const LoginPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  
  return (
    <Formik
      initialValues={{
        username: "",
        password: ""
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setAuthFailed(false);
        try {
          const res = await axios.post(routes.loginPath(), values);
          localStorage.setItem('userId', JSON.stringify(res.data));
          auth.logIn();
          const { from } = location.state || { from: { pathname: '/' } };
          navigate(from);
        } catch (err) {
          setSubmitting(false);
          if (err.isAxiosError && err.response?.status === 401) {
            setAuthFailed(true);
            inputRef.current.select();
            return;
          }
          throw err;
        }
      }}
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
                className={`form-control ${authFailed ? 'is-invalid' : ''}`}
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
                className={`form-control ${authFailed ? 'is-invalid' : ''}`}
                value={values.password}
              />
              <label htmlFor="password">Пароль</label>
              {authFailed && <div className="invalid-feedback">Неверные имя пользователя или пароль</div>}
              </div>

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