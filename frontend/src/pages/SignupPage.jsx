import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import i18next from '../util/i18n.js';
import { useNavigate } from 'react-router-dom';
import { setToken, setUsername } from '../store/authSlice.js';
import { useSignupMutation } from '../services/chatApi.js';
import avatar from '../assets/avatar-signup.jpg';

const Signup = () => {
  const usernameRef = useRef(null);
  const dispatch = useDispatch()
  const [ready, setReady] = useState(false);
  const [validationSchema, setValidationSchema] = useState(null);
  const [userExistsError, setUserExistsError] = useState(false);
  const navigate = useNavigate();
  const [signup] = useSignupMutation();

  useEffect(() => {
      const schema = yup.object().shape({
        username: yup
          .string()
          .trim()
          .min(3, i18next.t('validate.errorNameMin'))
          .max(20, i18next.t('validate.errorNameMax'))
          .required(i18next.t('validate.errorRequired')),
        password: yup
          .string()
          .trim()
          .min(6, i18next.t('validate.errorPasswordMin'))
          .max(20, i18next.t('validate.errorPasswordMax'))
          .required(i18next.t('validate.errorRequired')),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref('password'), null], i18next.t('validate.errorConfirmPassword'))
          .required(i18next.t('validate.errorRequired')),
      });
      setValidationSchema(schema);
      setReady(true);
  }, []);

  useEffect(() => {
    if (ready && usernameRef.current) {
      usernameRef.current.focus();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={avatar} className="rounded-circle" alt="Регистрация" />
              </div>
              <Formik
                initialValues={
                  { username: '', 
                    password: '', 
                    confirmPassword: '',
                  }}
                validationSchema={validationSchema}
                validateOnBlur
                validateOnChange={false}
                onSubmit={async (values, { setSubmitting }) => {
                  setUserExistsError(false);
                  try {
                    const response = await signup({
                      username: values.username,
                      password: values.password,
                    }).unwrap();
                    console.log('signup entry:', response)

                    const token = response.token;
                    const userId = { username: values.username, token };
                    localStorage.setItem('userId', JSON.stringify(userId));
                    dispatch(setUsername(values.username));
                    dispatch(setToken(token));
                    navigate('/');
                  } catch (error) {
                    if (error.status === 409) {
                      setUserExistsError(true);
                    } else {
                      console.error('Registration error:', error);
                    }
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form className="w-50">
                    <h1 className="text-center mb-4">{i18next.t('form.registration')}</h1>

                    <div className="form-floating mb-3 position-relative">
                      <Field
                        innerRef={usernameRef}
                        placeholder="От 3 до 20 символов"
                        name="username"
                        autoComplete="username"
                        required
                        id="username"
                        title={i18next.t('form.fildThisField')}
                        className={`form-control ${touched.username && errors.username ? 'is-invalid' : ''}`}
                      />
                      <label htmlFor="username">{i18next.t('form.usernameLabel')}</label>
                      {touched.username && errors.username && (
                        <div placement="right" className="invalid-tooltip">{errors.username}</div>
                      )}
                    </div>

                    <div className="form-floating mb-3 position-relative">
                      <Field
                        placeholder="Не менее 6 символов"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        id="password"
                        title={i18next.t('form.fildThisField')}
                        className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                      />
                      <label htmlFor="password">{i18next.t('form.passwordLabel')}</label>
                      {touched.password && errors.password && (
                        <div className="invalid-tooltip">{errors.password}</div>
                      )}
                    </div>

                    <div className="form-floating mb-4 position-relative">
                      <Field
                        placeholder="Пароли должны совпадать"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        required
                        id="confirmPassword"
                        title={i18next.t('form.fildThisField')}
                        className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
                      />
                      <label htmlFor="confirmPassword">{i18next.t('form.confirmPasswordLabel')}</label>
                      {touched.confirmPassword && errors.confirmPassword && (
                        <div className="invalid-tooltip">{errors.confirmPassword}</div>
                      )}
                    </div>

                    {userExistsError && (
                      <div className="text-danger mb-3 text-center">
                        {i18next.t('validate.errorUserExists')}
                      </div>
                    )}

                    <button type="submit" className="w-100 btn btn-outline-primary" disabled={isSubmitting}>
                      {i18next.t('buttons.submit')}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;