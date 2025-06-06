import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import notfound from '../assets/not-found.jpg'

const NotFound = () => {
  const { t } = useTranslation()
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-items-start h-100 pt-5">
        <div className="col-md-8 col-xxl-6">
          <div className="text-center">
            <img
              src={notfound}
              className="img-fluid w-50 mb-4"
              alt={t('notFound.notFoundTitle')}
            />
            <h1 className="h4 text-muted mb-3">
              {t('notFound.notFoundTitle')}
            </h1>
            <p className="text-muted">
              {t('notFound.notFoundText')}{' '}
              <Link to="/">{t('notFound.notFoundLink')}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
