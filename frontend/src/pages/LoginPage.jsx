import { Formik, Form, Field } from 'formik'
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import avatar from '../assets/avatar.jpg'
import { useLoginMutation } from '../services/authApi.js'
import { useAuth } from '../util/useAuth.js'

const LoginPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [authError, setAuthError] = useState(null)
  const [login] = useLoginMutation()
  const { loginAuth } = useAuth()
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (authError && usernameRef.current) {
      usernameRef.current.select()
    }
  }, [authError])

  const handleLogin = async (values, { setSubmitting }) => {
    setAuthError(null)

    if (values.username && !values.password) {
      passwordRef.current?.focus()
      setSubmitting(false)
      return
    }

    try {
      const response = await login(values).unwrap()
      loginAuth(response.token, response.username)
      navigate('/')
    }
    catch (error) {
      if (error?.status === 401) {
        setAuthError(t('login.errorToLogin'))
      }
      else {
        toast.error(t('alertErrors.networkError'))
      }
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={avatar} className="rounded-circle" alt={t('login.toEnterChat')} />
              </div>

              <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={handleLogin}
              >
                {({ isSubmitting, values }) => (
                  <Form className="col-12 col-md-6 mt-3 mt-md-0" noValidate>
                    <h1 className="text-center mb-4">{t('login.toEnterChat')}</h1>

                    <div className="form-floating mb-3">
                      <Field
                        innerRef={usernameRef}
                        type="text"
                        name="username"
                        autoComplete="off"
                        id="username"
                        title={t('login.userNameForChat')}
                        placeholder={t('login.userNameForChat')}
                        className={`form-control ${authError ? 'is-invalid' : ''}`}
                        required
                      />
                      <label htmlFor="username">{t('login.userNameForChat')}</label>
                    </div>

                    <div className="form-floating mb-4">
                      <Field
                        innerRef={passwordRef}
                        type="password"
                        name="password"
                        autoComplete="off"
                        id="password"
                        title={t('login.passwordUserForChat')}
                        placeholder={t('login.passwordUserForChat')}
                        className={`form-control ${authError ? 'is-invalid' : ''}`}
                        required
                      />
                      <label className="form-label" htmlFor="password">
                        {t('login.passwordUserForChat')}
                      </label>

                      {authError && values.username && values.password && (
                        <div className="invalid-tooltip">
                          {authError}
                        </div>
                      )}
                    </div>

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

            <div className="card-footer p-4">
              <div className="text-center">
                <span>
                  {t('login.createAccountForUser')}
                </span>
                <Link to="/signup">{t('login.toRegistrationNewUser')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
