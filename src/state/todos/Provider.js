import React, { useReducer } from 'react'
import TodoContect from './Context'
import todoReducer from './reducer'

function Provider({ children }) {
    const [todos, dispatchToTodos] = useReducer(todoReducer, []);
    return (
        <TodoContect.Provider value={{ todos, dispatchToTodos }}>
            {children}
        </TodoContect.Provider>
    )
}

export default Provider