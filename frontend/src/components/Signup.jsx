import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import i18next from 'i18next';
import avatar from '../assets/avatar-signup.jpg';
import ru from '../locales/ru.js'

const Signup = () => {

    i18next.init({
      lng: 'ru',
      resources: {
        ru,
      }
    });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={avatar}className="rounded-circle" alt="Регистрация" />
              </div>
              <Formik
              initialValues={{ username: '', password: '', confirmPassword: '' }}
              validationSchema={yup.object().shape({
                username: yup.string()
                  .trim()
                  .min(3, i18next.t('validate.errorNameMin'))
                  .max(10, i18next.t('validate.errorNameMax')),
                password: yup.string()
                  .trim()
                  .min(6, i18next.t('validate.errorPasswordMin'))
                  .max(12, i18next.t('validate.errorPasswordMax')),
                confirmPassword: yup.string()
                  .min(6, i18next.t('validate.errorPasswordMin'))
                  .max(12, i18next.t('validate.errorPasswordMax'))
                  .oneOf([yup.ref('password'), null], i18next.t('validate.errorConfirmPassword'))
                  .required(i18next.t('validate.errorRequired')),
              })}
              onSubmit={(values, { setSubmitting }) => {
                console.log('Submitting:', values);
                setSubmitting(false);
              }}
              >
                {({ isSubmitting }) => (
              <Form className="w-50">
                <h1 className="text-center mb-4">Регистрация</h1>
                <div className="form-floating mb-3">
                  <Field 
                    placeholder="От 3 до 20 символов" 
                    name="username" 
                    autocomplete="username" 
                    required="" 
                    id="username" 
                    className="form-control" 
                  />
                  <label className="form-label" htmlFor="username">{i18next.t('form.usernameLabel')}</label>
                </div>
                <div className="form-floating mb-3">
                  <Field 
                    placeholder="Не менее 6 символов" 
                    name="password" 
                    type="password" 
                    aria-describedby="passwordHelpBlock" 
                    required="" 
                    autocomplete="new-password" 
                    id="password" 
                    className="form-control" 
                  />
                  <ErrorMessage name="password" component="div" className="invalid-tooltip" />
                  <label className="form-label" htmlFor="password">{i18next.t('form.passwordLabel')}</label>
                </div>
                <div className="form-floating mb-4">
                  <Field 
                    placeholder="Пароли должны совпадать" 
                    name="confirmPassword" 
                    type="password" 
                    required="" 
                    autocomplete="new-password" 
                    id="confirmPassword" 
                    className="form-control" 
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="invalid-tooltip" />
                  <label className="form-label" htmlFor="confirmPassword">{i18next.t('form.confirmPasswordLabel')}</label>
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
  )
};

export default Signup;