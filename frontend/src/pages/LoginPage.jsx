import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken, setUsername } from '../store/authSlice.js';
import { useTranslation } from 'react-i18next';
import { useLoginMutation } from '../services/authApi.js';
import avatar from '../assets/avatar.jpg';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [authError, setAuthError] = useState(null);
  const [login] = useLoginMutation();
  const usernameRef = useRef(null);

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

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
        setAuthError(t('login.errorToLogin'));
      } else {
        toast.error(t('alertErrors.networkError'));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={avatar} className="rounded-circle" alt="Enter" />
              </div>

              <div className="col-12 col-md-6 mt-3 mt-md-0">
                <h1 className="text-center mb-4">{t('login.toEnterChat')}</h1>

                <Formik
                  initialValues={{ username: '', password: '' }}
                  onSubmit={handleLogin}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="form-floating mb-3">
                        <Field
                          innerRef={usernameRef}
                          type="text"
                          name="username"
                          placeholder={t('login.userNameForChat')}
                          className="form-control"
                          required
                        />
                        <label htmlFor="username">
                          {t('login.userNameForChat')}
                        </label>
                      </div>

                      <div className="form-floating mb-4">
                        <Field
                          type="password"
                          name="password"
                          placeholder= {t('login.passwordUserForChat')}
                          className="form-control"
                          required
                        />
                        <label htmlFor="password">
                          {t('login.passwordUserForChat')}
                        </label>
                      </div>

                      {authError && (
                        <div className="text-danger mb-3 text-center">
                          {authError}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-100 mb-3 btn btn-outline-primary"
                      >
                        {t('login.toEnterChat')}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>

            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('login.createAccountForUser')} </span>
                <a href="/signup">{t('login.toRegistrationNewUser')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;