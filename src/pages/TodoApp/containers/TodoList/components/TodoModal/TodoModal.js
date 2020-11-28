import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import styles from './TodoModal.module.css'
import { ReactComponent as DeleteIcon } from '../../../../../../assets/icons/delete-icon.svg'

function TodoModal({ id, getTitle, onModalClose, onTitleUpdate }) {
    const { getFieldProps, errors, handleSubmit} = useFormik({ 
        initialValues: {
            title: getTitle(id)
        },
        validationSchema: yup.object({
            title: yup.string().required('Você precisa preencher com uma tarefa')
        }),
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values, formikBag) => {
            onTitleUpdate(id, values.title)
            formikBag.setFieldValue('title', '', false)
            onModalClose()
        }
    })
    return (
        <>
            <div onClick={onModalClose} className={styles.backdrop}></div>
            <div className={styles.modal}> 
                <form onSubmit={handleSubmit}>
                    <button className={styles.close} onClick={onModalClose}><DeleteIcon /></button>
                    <input 
                        type='text' 
                        autoComplete='off' 
                        placeholder='Novo título'
                        {...getFieldProps('title')} />
                        {   
                            errors.title ? (
                            <small>{errors.title}</small> 
                            ): null
                        }
                    <button className={styles.submit} type='submit'>Atualizar</button>
                </form>
            </div>
        </>
    )
}

export default TodoModal
