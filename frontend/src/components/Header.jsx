import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../util/useAuth.js'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { isAuth, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  return (
    <nav className="shadow-sm navbar navbar-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">{t('navbar.chatName')}</Link>
        {isAuth && <button onClick={handleLogout} className="btn btn-primary">{t('navbar.logout')}</button>}
      </div>
    </nav>
  )
}

export default Header