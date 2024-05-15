
import { FaTrashAlt, FaEdit, FaCheckCircle } from 'react-icons/fa';

function Todo({ todos, dispatch, editProcess }) {

  function formattedTime(createdAt) {
    const time = new Date(createdAt);
    const hour = time.getHours().toString().padStart(2, '0');
    const minute = time.getMinutes().toString().padStart(2, '0');
    return `${hour}:${minute}`;
  }

  return (
    <div className='list'>
        {todos.map(todo => (
          <div className='task flex gap-10' key={todo.id}>
            <div className={`line ${todo.done ? 'done' : 'undone'}`}></div>
            <div className='task-content'>
              <p className='task-text'>{todo.name}</p>
              <div className='details flex space-between'>
                <p>
                  {`${new Date(todo.createdAt).toDateString().split(' ').slice(1).join(' ')} 
                  ${formattedTime(todo.createdAt)}`}
                </p>
                <div className='icons flex'>
                  <FaCheckCircle 
                    className={'check-circle-icon icon'}
                    onClick={() => dispatch({ type: 'TOGGLE_DONE', payload: todo.id })}
                  />
                  <FaEdit 
                    className='edit-icon icon'
                    onClick={() => editProcess(todo.id, todo.name)}
                  />
                  <FaTrashAlt 
                    className='bin-icon icon' 
                    onClick={() => dispatch({ type: 'DELETE_TASK', payload: todo.id})} 
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>    
  )
}

export default Todo;