import React from 'react';
import { useTranslation } from 'react-i18next';

const RemoveChannelModal = ({ show, onClose, onRemove }) => {
  const { t } = useTranslation();
  if (!show) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleRemove = () => {
    onRemove();
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" onClick={handleBackdropClick}>
      <div className="modal-dialog modal-dialog-centered" role="document" onClick={e => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t('channels.removeThisChannel')}</h5>
            <button type="button" className="btn btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
              <div>
                <p className="lead">{t('channels.removeConfirm')}</p>
                <div className="d-flex justify-content-end">
                  <button type="button" className="me-2 btn btn-secondary" onClick={onClose}>{t('channels.cancelOfChannel')}</button>
                  <button type="submit" className="btn btn-danger" onClick={handleRemove}>{t('channels.sendOfChannel')}</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveChannelModal;