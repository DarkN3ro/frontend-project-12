import { Formik, Form, ErrorMessage } from 'formik'
import { useEffect, useState, useRef } from 'react'
import { Modal, Button, Form as BootstrapForm } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

import filter from '../util/profanity.js'

const RenameChannelModal = ({ show, onClose, existingChannels, onSubmit, channel }) => {
  const inputRef = useRef(null)
  const { t } = useTranslation()
  const [validationSchema, setValidationSchema] = useState(null)

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
          (value) => {
            if (!value) return true
            const existingNamesLower = existingChannels
              .filter(channel => channel && typeof channel.name === 'string')
              .map(channel => channel.name.toLowerCase())
            return !existingNamesLower.includes(value.toLowerCase().trim())
          },
        ),
    })

    setValidationSchema(schema)
  }, [existingChannels, t])

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [show])

  if (!show || !validationSchema) return null

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.renameThisChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: channel.name }}
          validateOnBlur={false}
          validateOnChange={true}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const cleanName = filter.clean(values.name)
            if (cleanName !== values.name) {
              onSubmit({ name: cleanName })
            }
            else {
              onSubmit(values)
            }
            setSubmitting(false)
            resetForm()
            if (inputRef.current) {
              inputRef.current.blur()
            }
          }}
        >
          {formik => (
            <Form noValidate>
              <BootstrapForm.Group className="mb-2">
                <BootstrapForm.Label visuallyHidden htmlFor="name">
                  {t('channels.nameChannel')}
                </BootstrapForm.Label>
                <BootstrapForm.Control
                  type="text"
                  id="name"
                  name="name"
                  ref={inputRef}
                  placeholder={t('channels.nameChannel')}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.name && formik.errors.name}
                />
                <ErrorMessage name="name" component="div" className="invalid-feedback" />
              </BootstrapForm.Group>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" onClick={onClose} className="me-2">
                  {t('channels.cancelOfChannel')}
                </Button>
                <Button type="submit" variant="primary" disabled={formik.isSubmitting}>
                  {t('channels.sendOfChannel')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  )
}

export default RenameChannelModal
