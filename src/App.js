
import TodoForm from './components/TodoForm';

function App() {
  return (
    <main>
      <div className='container center'>
        <section>
          <div className='to-do'>
            <h1>Task Tracker</h1>
            <TodoForm />
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
