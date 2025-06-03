import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { closeCreateModal } from '../store/modalsSlice.js';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import filter from '../util/profanity.js';

const AddChannelModal = ({ onSubmit, existingChannels  }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const show = useSelector(state => state.modals.createModalOpen);
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

  if (!show || !validationSchema) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(closeCreateModal());
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" onClick={handleBackdropClick}>
      <div className="modal-dialog modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t('channels.addChannel')}</h5>
            <button type="button" className="btn btn-close" aria-label="Close" onClick={() => dispatch(closeCreateModal())}></button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={{ name: '' }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                onSubmit(values);
                setSubmitting(false);
                resetForm();
                dispatch(closeCreateModal());
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
                      placeholder={t('channels.nameChannel')}
                    />
                    <label className="visually-hidden" htmlFor="name">
                    {t('channels.nameChannel')}
                    </label>
                    <ErrorMessage name="name" component="div" className="invalid-feedback d-block" />
                    <div className="d-flex justify-content-end">
                      <button type="button" className="me-2 btn btn-secondary" onClick={() => dispatch(closeCreateModal())}>
                      {t('channels.cancelOfChannel')}
                      </button>
                      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
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

export default AddChannelModal;