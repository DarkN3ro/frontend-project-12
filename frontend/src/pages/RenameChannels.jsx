import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import i18next from '../i18n';

const RenameChannelModal = () => {
    const [validationSchema, setValidationSchema] = useState(null);
  
    useEffect(() => {
        const schema = Yup.object().shape({
          name: Yup.string()
      .trim()
      .min(3, i18next.t('validate.errorNameMin'))
      .max(20, i18next.t('validate.errorNameMax'))
      .required(i18next.t('validate.errorRequired')),
    });
  
      setValidationSchema(schema);
    }, []);
  
    if (!show || !validationSchema) return null;
  
    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog" onClick={handleBackdropClick}>
          <div className="modal-dialog modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{i18next.t('channels.renameChannel')}</h5>
                <button type="button" className="btn btn-close" aria-label="Close" onClick={onClose}></button>
              </div>
              <div className="modal-body">
                <Formik
                  initialValues={{ name: '' }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    onSubmit(values);
                    setSubmitting(false);
                    resetForm();
                  }}
                >
                  {({ isSubmitting, errors, touched  }) => (
                    <Form noValidate>
                      <div>
                        <Field
                          name="name"
                          id="name"
                          className={`mb-2 form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                          autoFocus
                          placeholder="Имя канала"
                        />
                        <label className="visually-hidden" htmlFor="name">
                          Имя канала
                        </label>
                        <ErrorMessage name="name" component="div" className="invalid-feedback d-block" />
                        <div className="d-flex justify-content-end">
                          <button type="button" className="me-2 btn btn-secondary" onClick={onClose}>
                          {i18next.t('channels.cancelOfChannel')}
                          </button>
                          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                          {i18next.t('channels.sendOfChannel')}
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default RenameChannelModal;