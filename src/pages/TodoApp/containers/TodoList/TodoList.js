import React, { useContext, useCallback, useState } from 'react'
import TodoItem from './components/TodoItem/TodoItem'
import TodoModal from './components/TodoModal/TodoModal'
import TodosContext from '../../../../state/todos/Context'
import * as todosActions from '../../../../state/todos/actions'
import FilterContext from '../../../../state/filter/Context'
import styles from './TodoList.module.css'

function filteredList(list, currentFilter) {
    switch(currentFilter) {
        case 'all':
            return list
        case 'active':
            return list.filter((item) => {
                return item.completed === false;
            })
        case 'completed':
            return list.filter((item) => {
                return item.completed === true;
            })
        default: 
            throw new Error()
    }
}

function TodoList() {
    const { todos, dispatchToTodos } = useContext(TodosContext)
    const handleDelete = useCallback((id) => {
        dispatchToTodos(todosActions.removeTodo(id))
    }, [dispatchToTodos])
    const handleTitleUpdate = useCallback((id, title)=> {
        dispatchToTodos(todosActions.toggleTodoTitle(id, title))
    }, [dispatchToTodos])
    const handleStatusUpdate = useCallback((id, completed)=> {
        dispatchToTodos(todosActions.toggleTodoStatus(id, completed))
    }, [dispatchToTodos])
    const [currentId, setCurrentId] = useState(null)
    const handleModalOpen = useCallback((id) => {
        setCurrentId(id)
    }, [])
    const handleModalClose = useCallback(() => {
        setCurrentId(null)
    }, [])
    const getTitle = useCallback((id) => {
        let todo = todos.find((todo) => {
            return todo.id === id
        })
        return todo ? todo.title : ''
    } , [todos])

    const { filter } = useContext(FilterContext)
   
    return (
        <div className={styles.container}>
            <ul>
            {filteredList(todos, filter).map((todo) => {
                   return (
                        <TodoItem 
                            key={ todo.id } 
                            id={ todo.id }
                            title={ todo.title }
                            completed={ todo.completed }
                            onStatusUpdate={handleStatusUpdate}
                            onModalOpen={handleModalOpen}
                            onDelete={handleDelete}
                        />
                   )
                })}
            </ul>
            {currentId && (
                <TodoModal 
                    id={currentId}
                    getTitle={getTitle}
                    onTitleUpdate={handleTitleUpdate} 
                    onModalClose={handleModalClose}
                />
            )}
        </div>
    )
}

export default TodoList