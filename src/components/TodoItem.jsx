import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleCompleteAsync, deleteTodoAsync } from '../redux/todoSlice';

const TodoItem = ({ id, title, completed }) => {
    const dispatch = useDispatch();
    const handleCompleteClick = () => {
        dispatch(toggleCompleteAsync({ id, completed:!completed }));
    };
    const handleDeleteClick = () => {
        dispatch(deleteTodoAsync({ id }))
    };

    return (
        <li>
            <div>
                <input
                    className='todoItem'
                    type="checkbox"
                    checked={completed}
                    onChange={handleCompleteClick}
                />
                {title}
                <button onClick={handleDeleteClick}>Delete</button>
            </div>
        </li>
    )
}

export default TodoItem