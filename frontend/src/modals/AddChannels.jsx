import { Formik, Form, ErrorMessage } from 'formik'
import { useEffect, useState, useRef } from 'react'
import { Modal, Button, Form as BootstrapForm } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

import { closeCreateModal } from '../store/modalsSlice.js'
import filter from '../util/profanity.js'

const AddChannelModal = ({ onSubmit, existingChannels }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const show = useSelector(state => state.modals.createModalOpen)
  const inputRef = useRef(null)
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
      setTimeout(() => inputRef.current.focus(), 0)
    }
  }, [show])

  if (!show || !validationSchema) return null

  const handleClose = () => {
    dispatch(closeCreateModal())
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
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
            handleClose()
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
                  name="name"
                  id="name"
                  placeholder={t('channels.nameChannel')}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.name && formik.errors.name}
                  ref={inputRef}
                />
                <ErrorMessage name="name" component="div" className="invalid-feedback" />
              </BootstrapForm.Group>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" onClick={handleClose} className="me-2">
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

export default AddChannelModal
