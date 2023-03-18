import React, { useEffect } from 'react'
import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux';
import { getTodosAsync } from '../redux/todoSlice';

export const TodoList = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);
    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch])

    return (
        <ul>
            {todos.map((todo, index) => (
                <TodoItem
                    key={index}
                    id={todo.id}
                    title={todo.title}
                    completed={todo.completed}
                />
            ))}
        </ul>
    )
}
