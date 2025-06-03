import React, { useEffect, useState, useRef} from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import filter from '../util/profanity.js';

const RenameChannelModal = ({show, onClose, existingChannels, onSubmit}) => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
    const [validationSchema, setValidationSchema] = useState(null);
  
    useEffect(() => {
        const schema = Yup.object().shape({
          name: Yup.string()
      .trim()
      .min(3, t('validate.errorNameMin'))
      .max(20, t('validate.errorNameMax'))
      .required(t('validate.errorRequired'))
      .test(
        'unique',
        t('channels.errorChannelExists'),
        value => {
          if (!value) return true;
          const existingNamesLower = existingChannels
            .filter(channel => channel && typeof channel.name === 'string')
            .map(channel => channel.name.toLowerCase());
          return !existingNamesLower.includes(value.toLowerCase().trim());
        }
      )
      .test(
        'no-profanity',
        t('validate.profanityNotAllowed'),
        value => {
          if (!value) return true;
          return !filter.check(value);
        }
      ),
    });
  
      setValidationSchema(schema);
    }, [existingChannels, t]);

    useEffect(() => {
      if (show && inputRef.current) {
        inputRef.current.focus();
      }
    }, [show]);
  
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
                <h5 className="modal-title">{t('channels.renameThisChannel')}</h5>
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
                  {(formik) => (
                    <Form noValidate>
                      <div>
                        <input
                          ref={inputRef}
                          name="name"
                          id="name"
                          className={`mb-2 form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                          placeholder={t('channels.nameChannel')}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.name}
                        />
                        <label className="visually-hidden" htmlFor="name">
                          {t('channels.nameChannel')}
                        </label>
                        <ErrorMessage name="name" component="div" className="invalid-feedback d-block" />
                        <div className="d-flex justify-content-end">
                          <button type="button" className="me-2 btn btn-secondary" onClick={onClose}>
                            {t('channels.cancelOfChannel')}
                          </button>
                          <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                            {t('channels.sendOfChannel')}
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