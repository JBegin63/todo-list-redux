import React from 'react';
import { useSelector } from 'react-redux';

const TotalCompleteItems = () => {
    const completedTodos = useSelector((state) => 
        state.todos.filter((todo) => todo.completed === true)
    );

    return (
        <div>
            <h4>Total Complete Items: {completedTodos.length}</h4>
        </div>
    )
}

export default TotalCompleteItems;