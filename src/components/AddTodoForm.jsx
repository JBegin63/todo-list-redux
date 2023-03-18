import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../redux/todoSlice';

const AddTodoForm = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => { 
    e.preventDefault();
    dispatch(addTodoAsync({
      title: task,
    }));
    setTask("");
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder='enter task' onChange={(e) => setTask(e.target.value)} value={task}/>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default AddTodoForm
