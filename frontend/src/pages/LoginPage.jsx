import React, { useState } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken, setUsername } from '../store/authSlice.js';
import i18next from '../util/i18n.js';
import { useLoginMutation } from '../services/authApi.js';
import avatar from '../assets/avatar.jpg';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);
  const [login] = useLoginMutation();

  const handleLogin = async (values, { setSubmitting }) => {
    setAuthError(null);

    try {
      const response = await login(values).unwrap();
      const { token, username } = response;
      const userId = { token, username };
      localStorage.setItem('userId', JSON.stringify(userId));
      dispatch(setToken(token));
      dispatch(setUsername(username));
      navigate('/');
    } catch (error) {
      if (error?.status === 401) {
      setAuthError(i18next.t('login.errorToLogin'));
      } else {
        toast.error(i18next.t('alertErrors.networkError'))
      }
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
                  <h1 className="text-center mb-4">{i18next.t('login.toEnterChat')}</h1>
                  <div className="form-floating mb-3">
              <input
                type="username"
                name="username"
                autoComplete="username"
                placeholder="Ваш ник"
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
                value={values.username}
                required
              />
              <label htmlFor="username">{i18next.t('login.userNameForChat')}</label>
            </div>
            <div className="form-floating mb-4">
              <input
                type="password"
                name="password"
                autoComplete="password"
                placeholder="Пароль"
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
                value={values.password}
                required
              />
              <label htmlFor="password">{i18next.t('login.passwordUserForChat')}</label>
              </div>

              {authError && (
                <div className="text-danger mb-3 text-center">
                  {authError}
                </div>
              )}

              <button type="submit" disabled={isSubmitting} className="w-100 mb-3 btn btn-outline-primary">
              {i18next.t('login.toEnterChat')}
              </button>
                </form>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>{i18next.t('login.createAccountForUser')} </span>
                  <a href="/signup">{i18next.t('login.toRegistrationNewUser')}</a>
                </div>
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