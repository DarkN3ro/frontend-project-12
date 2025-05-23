import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import i18next from 'i18next';
import avatar from '../assets/avatar-signup.jpg';
import ru from '../locales/ru';

const Signup = () => {
  const usernameRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [validationSchema, setValidationSchema] = useState(null);

  useEffect(() => {
    i18next.init({
      lng: 'ru',
      resources: {
        ru: ru,
      },
    }).then(() => {
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
    });
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
                initialValues={{ username: '', password: '', confirmPassword: '' }}
                validationSchema={validationSchema}
                validateOnBlur
                validateOnChange={false}
                onSubmit={(values, { setSubmitting }) => {
                  console.log('Submitting:', values);
                  setSubmitting(false);
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
                        className={`form-control ${touched.username && errors.username ? 'is-invalid' : ''}`}
                      />
                      <label htmlFor="username">{i18next.t('form.usernameLabel')}</label>
                      {touched.username && errors.username && (
                        <div className="invalid-tooltip d-block">{errors.username}</div>
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
                        className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                      />
                      <label htmlFor="password">{i18next.t('form.passwordLabel')}</label>
                      {touched.password && errors.password && (
                        <div className="invalid-tooltip d-block">{errors.password}</div>
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
                        className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
                      />
                      <label htmlFor="confirmPassword">{i18next.t('form.confirmPasswordLabel')}</label>
                      {touched.confirmPassword && errors.confirmPassword && (
                        <div className="invalid-tooltip d-block">{errors.confirmPassword}</div>
                      )}
                    </div>

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