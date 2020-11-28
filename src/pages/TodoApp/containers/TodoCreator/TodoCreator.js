import React, { useContext, useRef, useEffect } from 'react'
import { useFormik } from 'formik'
import TodosContext from '../../../../state/todos/Context'
import * as todosActions from '../../../../state/todos/actions'
import * as yup from 'yup'
import styles from './TodoCreator.module.css'

function TodoCreator() {
    const { dispatchToTodos } = useContext(TodosContext)
    const { getFieldProps, errors, handleSubmit} = useFormik({ 
        initialValues: {
            title: ''
        },
        validationSchema: yup.object({
            title: yup.string().required('Você precisa preencher com uma tarefa')
        }),
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values, formikBag) => {
            dispatchToTodos(todosActions.addTodo(values.title))
            formikBag.setFieldValue('title', '', false)
        }
    })
    const inputTitle = useRef(null)
    useEffect(() => {
        inputTitle.current.focus()
    }, [])

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <input 
                type='text' 
                autoComplete='off' 
                placeholder='Nova tarefa'
                ref={inputTitle}
                {...getFieldProps('title')} />
                {   
                    errors.title ? (
                    <small>{errors.title}</small> 
                    ): null
                }
            <button type='submit'>Adicionar</button>
        </form>
    )
}

export default TodoCreator