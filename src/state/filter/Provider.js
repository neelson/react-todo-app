import React, { useReducer } from 'react'
import FilterContect from './Context'
import filterReducer from './reducer'

function Provider({ children }) {
    const [filter, dispatchToFilter] = useReducer(filterReducer, 'all');
    return (
        <FilterContect.Provider value={{ filter, dispatchToFilter }}>
            {children}
        </FilterContect.Provider>
    )
}

export default Provider