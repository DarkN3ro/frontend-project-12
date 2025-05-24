import React from 'react';

const AddChannelModal = ({ show, onClose, onSubmit, channelName, onChange, error }) => {
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
            <h5 className="modal-title">Добавить канал</h5>
            <button type="button" className="btn btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit} noValidate>
              <div>
                <input
                  name="name"
                  id="name"
                  className={`mb-2 form-control ${error ? 'is-invalid' : ''}`}
                  value={channelName}
                  onChange={onChange}
                  autoFocus
                  placeholder="Имя канала"
                />
                <label className="visually-hidden" htmlFor="name">Имя канала</label>
                <div className="invalid-feedback">{error}</div>
                <div className="d-flex justify-content-end">
                  <button type="button" className="me-2 btn btn-secondary" onClick={onClose}>Отменить</button>
                  <button type="submit" className="btn btn-primary">Отправить</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChannelModal;