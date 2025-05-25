import React from 'react';

const RemoveChannelModal = () => {
  if (!show) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" onClick={handleBackdropClick}>
      <div className="modal-dialog modal-dialog-centered" role="document" onClick={e => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Удалить канал</h5>
            <button type="button" className="btn btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
              <div>
                <p className="lead">Уверены?</p>
                <div className="d-flex justify-content-end">
                  <button type="button" className="me-2 btn btn-secondary" onClick={onClose}>Отменить</button>
                  <button type="submit" className="btn btn-danger">Отправить</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveChannelModal;