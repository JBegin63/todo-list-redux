import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodosAsync = createAsyncThunk(
    'todos/getTodos', 
    async () => {
        const res = await fetch('http://localhost:7000/todos');
        if(res.ok) {
            const todos = await res.json();
            return { todos };
        }
    },
);

export const addTodoAsync = createAsyncThunk(
    'todos/addTodo', 
    async (payload) => {
        const res = await fetch('http://localhost:7000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: payload.title }),
        });
        if (res.ok) {
            const todo = await res.json();
            return { todo };
        }
    },
);

export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodoAsync', 
    async (payload) => {
        const res = await fetch(`http://localhost:7000/todos/${payload.id}`,
        {
            method: 'DELETE',
        })
        if (res.ok) {
            return { id: payload.id };
        }
    },
)

export const toggleCompleteAsync = createAsyncThunk(
    'todos/completeTodoAsync',
    async (payload) => {
        const res = await fetch(
            `http://localhost:7000/todos/${payload.id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: payload.completed }),
            });
        if (res.ok) {
            const todo = await res.json();
            return { id: todo.id, completed: todo.completed };
        }
    }
);

const todoSlice = createSlice({
    name: "todos",
    initialState: [],
    reducers: {
        // This is if you have no api to connect to
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                completed: false,
            };
            state.push(newTodo);
        },
        toggleComplete: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state[index].completed = action.payload.completed;
        },
        deleteTodo: (state, action) => {
            return state.filter((todo) => todo.id!== action.payload.id);
        },
    },
    extraReducers: {
        // Async actions work with api
        [getTodosAsync.pending]: (state, action) => {
            console.log("fetching data...");
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            console.log("fetched data successfully!");
            return action.payload.todos;
        },
        [addTodoAsync.pending]: (state, action) => {
            console.log("submitting todo...");
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            console.log("todo was submitted successfully!");
            state.push(action.payload.todo);
        },
        [toggleCompleteAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state[index].completed = action.payload.completed;
        },
        [deleteTodoAsync.fulfilled]: (state, action) => {
            return state.filter((todo) => todo.id!== action.payload.id);
        }
    },
});

export const {
    addTodo,
    toggleComplete,
    deleteTodo,
} = todoSlice.actions;

export default todoSlice.reducer;