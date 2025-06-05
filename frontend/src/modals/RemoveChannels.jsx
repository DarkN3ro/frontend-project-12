import React, { useRef, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const RemoveChannelModal = ({ show, onClose, onRemove }) => {
  const { t } = useTranslation();
  const refSubmitButton = useRef();

  useEffect(() => {
    if (show && refSubmitButton.current) {
      refSubmitButton.current.focus();
    }
  }, [show]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onRemove();
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.removeThisChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit={ handleSubmit }>
        <p className="lead mb-4">{t('channels.removeConfirm')}</p>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onClose} className="me-2">
              {t('channels.cancelOfChannel')}
            </Button>
            <Button variant="danger" type="submit" ref={refSubmitButton}>
              {t('channels.sendOfChannel')}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default RemoveChannelModal;