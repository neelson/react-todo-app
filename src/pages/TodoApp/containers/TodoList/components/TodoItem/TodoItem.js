import React, { useCallback, useState, useEffect } from 'react'
import styles from './TodoItem.module.css'
import { ReactComponent as UpdateIcon } from '../../../../../../assets/icons/update-icon.svg'
import { ReactComponent as DeleteIcon } from '../../../../../../assets/icons/delete-icon.svg'

function TodoItem({ id, title, completed, onDelete, onStatusUpdate, onModalOpen}) {
    const [isChecked, setIsChecked] = useState(completed)
    const handleChange = useCallback((evt) => {
        setIsChecked(evt.target.checked)
    }, [])
    const handleModalOpen = useCallback(() => {
        onModalOpen(id)
    }, [id])
    useEffect(() => {
        onStatusUpdate(id, isChecked)
    }, [id, isChecked])
    return (
        <li className={styles.item}>
            <span className={completed ? styles.completed : null}>{title}</span>
            <div className={styles.controllButtons}>
                <button onClick={handleModalOpen}><UpdateIcon/></button>
                <input type='checkbox' checked={isChecked} onChange={handleChange}/>
                <button onClick={() => { onDelete(id) }}><DeleteIcon/></button>
            </div>
        </li>
    )
}

export default TodoItem