import { Formik, Form, Field } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import avatar from '../assets/avatar-signup.jpg'
import { useSignupMutation } from '../services/authApi.js'
import { useAuth } from '../util/useAuth.js'

const Signup = () => {
  const usernameRef = useRef(null)
  const { t } = useTranslation()
  const [ready, setReady] = useState(false)
  const [validationSchema, setValidationSchema] = useState(null)
  const [userExistsError, setUserExistsError] = useState(false)
  const navigate = useNavigate()
  const [signup] = useSignupMutation()
  const { loginAuth } = useAuth()

  useEffect(() => {
    const schema = yup.object().shape({
      username: yup
        .string()
        .trim()
        .min(3, t('validate.errorNameMin'))
        .max(20, t('validate.errorNameMax'))
        .required(t('validate.errorRequired')),
      password: yup
        .string()
        .trim()
        .min(6, t('validate.errorPasswordMin'))
        .max(20, t('validate.errorPasswordMax'))
        .required(t('validate.errorRequired')),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], t('validate.errorConfirmPassword'))
        .required(t('validate.errorRequired')),
    })
    setValidationSchema(schema)
    setReady(true)
  }, [t])

  useEffect(() => {
    if (ready && usernameRef.current) {
      usernameRef.current.focus()
    }
  }, [ready])

  if (!ready) {
    return null
  }

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={avatar} className="rounded-circle" alt={t('form.registration')} />
              </div>
              <Formik
                initialValues={
                  { username: '',
                    password: '',
                    confirmPassword: '',
                  }
                }

                validationSchema={validationSchema}
                validateOnBlur
                validateOnChange={false}
                onSubmit={async (values, { setSubmitting }) => {
                  setUserExistsError(false)
                  try {
                    const response = await signup({
                      username: values.username,
                      password: values.password,
                    }).unwrap()

                    loginAuth(response.token, response.username)
                    navigate('/')
                  }
                  catch (error) {
                    if (error?.status === 409) {
                      setUserExistsError(true)
                    }
                    else if (error?.status) {
                      toast.error(t('alertErrors.networkError'))
                    }
                    else {
                      toast.error(t('alertErrors.serverError'))
                    }
                  }
                  finally {
                    setSubmitting(false)
                  }
                }}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form className="w-50">
                    <h1 className="text-center mb-4">{t('form.registration')}</h1>

                    <div className="form-floating mb-3 position-relative">
                      <Field
                        innerRef={usernameRef}
                        placeholder=" "
                        name="username"
                        autoComplete="off"
                        required
                        id="username"
                        title={t('form.fildThisField')}
                        className={`form-control ${touched.username && errors.username ? 'is-invalid' : ''}`}
                      />
                      <label htmlFor="username">{t('form.usernameLabel')}</label>
                      {touched.username && errors.username && (
                        <div className="invalid-tooltip">{errors.username}</div>
                      )}
                    </div>

                    <div className="form-floating mb-3 position-relative">
                      <Field
                        placeholder=" "
                        name="password"
                        type="password"
                        autoComplete="off"
                        required
                        id="password"
                        title={t('form.fildThisField')}
                        className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                      />
                      <label htmlFor="password">{t('form.passwordLabel')}</label>
                      {touched.password && errors.password && (
                        <div className="invalid-tooltip">{errors.password}</div>
                      )}
                    </div>

                    <div className="form-floating mb-4 position-relative">
                      <Field
                        placeholder=" "
                        name="confirmPassword"
                        type="password"
                        autoComplete="off"
                        required
                        id="confirmPassword"
                        title={t('form.fildThisField')}
                        className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
                      />
                      <label htmlFor="confirmPassword">{t('form.confirmPasswordLabel')}</label>
                      {touched.confirmPassword && errors.confirmPassword && (
                        <div className="invalid-tooltip">{errors.confirmPassword}</div>
                      )}
                    </div>

                    {userExistsError && (
                      <div className="text-danger mb-3 text-center">
                        {t('validate.errorUserExists')}
                      </div>
                    )}

                    <button type="submit" className="w-100 btn btn-outline-primary" disabled={isSubmitting}>
                      {t('buttons.submit')}
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
}

export default Signup
