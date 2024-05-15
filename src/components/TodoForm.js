
import { useReducer, useState, useEffect } from 'react';
import Todo from './Todo';

const initialState = JSON.parse(localStorage.getItem('todos')) || [];

function reducer(state, action) {
  switch(action.type) {
    case 'ADD_TASK': 
      return [
        ...state,
        {
          id: state.length + 1,
          name: action.payload,
          done: false,
          createdAt: new Date()
        }
      ];

    case 'EDIT_TASK': 
      return state.map(todo => 
        todo.id === action.payload.id ? { ...todo, name: action.payload.name } : todo
      );

    case 'TOGGLE_DONE':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      );

    case 'DELETE_TASK': 
      return state.filter(d => d.id !== action.payload)

    default:
      return state;
  }
}

/*
  the reducer function takes in two arguments the state and action.
  switch case statement(action.type) is where the type action is chosen 
  to be applied to the state
*/

function TodoForm() {
  const [todos, dispatch] = useReducer(reducer, initialState)
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState('');
  /*
    Reducer is a pattern basically taken from the Redux.
    Reducer is a function that takes previous state and action as an argument and
    written the new state

    const [state, dispatch] = useReducer(reducer, initialState)
    useReducer returns two states - [state] to get the current state and
    [dispatch] to update/set the state.
    Similiar to useState
  */

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const updateTask = event => {
    event.preventDefault();  // Hey, form! Do not submit!

    if (!editTaskName.trim()) {
      return;
    }
    if (editTaskId !== null) {
      dispatch({ type: 'EDIT_TASK', payload: { id: editTaskId, name: editTaskName } });
      setEditTaskId(null);
      setEditTaskName('');
    } else {
      dispatch({ type: 'ADD_TASK', payload: event.target.task.value });
      setEditTaskName('');
    }
    event.target.task.value = '';
  };

  const editProcess = (id, name) => {
    setEditTaskId(id);
    setEditTaskName(name);
  };

  return (
    <>
      <section className='form-section'>
        <form onSubmit={updateTask}>
          <input 
            type='text' 
            placeholder='New Task' 
            name='task'
            value={editTaskName}
            onChange={(event) => setEditTaskName(event.target.value)}
          />
          <input 
            type='submit' 
            placeholder="Add" 
            value={'Add'} 
          />
        </form>
      </section>
      <Todo 
        todos={todos} 
        dispatch={dispatch}
        editProcess={editProcess}
      />
    </>
  )
}

export default TodoForm;