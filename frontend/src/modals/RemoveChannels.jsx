import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const RemoveChannelModal = ({ show, onClose, onRemove }) => {
  const { t } = useTranslation()
  if (!show) return null

  const handleRemove = () => {
    onRemove()
    onClose()
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.removeThisChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead mb-4">{t('channels.removeConfirm')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={onClose} className="me-2">
            {t('channels.cancelOfChannel')}
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            {t('channels.sendOfChannel')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default RemoveChannelModal
