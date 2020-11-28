import React from 'react'
import styles from './TodoSelect.module.css'

function TodoSelect({ value, onChange, options, onFilterUpdate }) {
    return (
        <select className={styles.select} value={value} onChange={onChange}>
            {options.map((option) => {
                return <option value={option.value}>{option.title}</option>
            })}
        </select>
    )
}

export default TodoSelect