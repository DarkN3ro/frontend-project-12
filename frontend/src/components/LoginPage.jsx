import React from 'react';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/avatar.jpg';

const LoginPage = () => {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);

  const handleLogin = async (values, { setSubmitting }) => {
    setAuthError(null);
    try {
      // Пример локальной проверки логина
      if (values.username === 'admin' && values.password === 'admin') {
        const fakeToken = 'fake-jwt-token';
        localStorage.setItem('token', fakeToken);
        navigate('/');
      } else {
        throw new Error('Неверные имя пользователя или пароль');
      }
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