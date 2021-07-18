import { useState } from 'react';
import './App.css';
import Attribution from './components/Attribution';
import Navigation from './components/Navigation';
import NewTodo from './components/NewTodo';
import ThemeSwitcher from './components/ThemeSwitcher';
import Todo from './components/Todo';

function App() {
  let defaultTodos = [
    {id: 1, text: 'Wake up', isCompleted: true},
    {id: 2, text: 'Eat breakfast', isCompleted: false},
    {id: 3, text: 'Do some coding', isCompleted: false},
    {id: 4, text: 'Work out', isCompleted: false},
    {id: 5, text: 'Win 5 online games in Rocket League', isCompleted: false},
    {id: 6, text: 'Go to sleep', isCompleted: false}
  ];
  let defaultTheme = 'default';

  const savedTodos = window.localStorage.getItem('todos');
  if (savedTodos) {
    defaultTodos = JSON.parse(savedTodos);
    defaultTodos = defaultTodos.map((todo, index) => {return {...todo, id: index}}); // Resets IDs so that they stay low and do not clash
  }

  const savedTheme = window.localStorage.getItem('theme');
  if (savedTheme) {
    defaultTheme = JSON.parse(savedTheme);
  }
  document.documentElement.className = defaultTheme; // Sets root element class name so it can access css variables, otherwise background will not work
  
  const [ theme, setTheme ] = useState(defaultTheme);
  const [ todos, setTodos ] = useState(defaultTodos);
  const [ counter, setCounter ] = useState(defaultTodos.length);
  const [ todosFilter, setTodosFilter ] = useState('all');

  const switchTheme = () => {
    let newTheme = 'default';
    if (theme === 'default') newTheme = 'alternate';
    updateLocalStorage('theme', newTheme);
    setTheme(newTheme);
    document.documentElement.className = newTheme; // If confused, see comment above
  };

  const updateLocalStorage = (property, value) => {
    window.localStorage.setItem(property, JSON.stringify(value));
  };

  const addTodo = (text, isCompleted) => {
    const newTodos = [...todos, {id: counter + 1, text: text, isCompleted: isCompleted}];
    updateLocalStorage('todos', newTodos);
    setTodos(newTodos);
    setCounter(counter + 1);
  };
  
  const editTodo = (id, isCompleted) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.isCompleted = isCompleted;
    updateLocalStorage('todos', newTodos);
    setTodos(newTodos);
  };
  
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    updateLocalStorage('todos', newTodos);
    setTodos(newTodos);
  };
  
  // Moves todo with id 'id1' into the position of todo with id 'id2' 
  const moveTodo = (id1, id2) => {
    if (id1 === id2) return;
    const initialIndex = todos.findIndex(todo => todo.id === id1);
    if (initialIndex === -1) return;

    const todo = todos[initialIndex];
    const newTodos = [...todos];

    const finalIndex = newTodos.findIndex(todo => todo.id === id2);
    if (finalIndex === -1) return;

    newTodos.splice(initialIndex, 1);
    newTodos.splice(finalIndex, 0, todo);
    updateLocalStorage('todos', newTodos);
    setTodos(newTodos);
  };

  const clearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.isCompleted);
    updateLocalStorage('todos', newTodos);
    setTodos(newTodos);
  };

  const updateFilter = (e) => {
    if (e.target.checked) {
      setTodosFilter(e.target.value);
    }
  };

  const filterTodos = () => {
    switch (todosFilter) {
      case 'active':
        return todos.filter((todo) => !todo.isCompleted);
      case 'completed':
        return todos.filter((todo) => todo.isCompleted);
      default:
        return todos;
    }
  };

  return (
    <div className="App">
      <header>
        <h1 className="title">Todo</h1>
        <ThemeSwitcher switchTheme={switchTheme} />
      </header>

      <div className="container">
        <NewTodo addTodo={addTodo} />
      </div>

      <div className="container">
        <div className="todoList">
          {filterTodos().map((todo) => (
            <Todo key={todo.id} id={todo.id} text={todo.text} isCompleted={todo.isCompleted} 
                  deleteTodo={deleteTodo} editTodo={editTodo} moveTodo={moveTodo} />
          ))}
        </div>

        <div className="todoListInfo flex-sb-c height pd-x">
          <p className="text">{filterTodos().length} item{(filterTodos().length !== 1)? 's': ''} left</p>
          <Navigation id="1" classes="hidden-sm" updateFilter={updateFilter} todosFilter={todosFilter} />
          <button type="button" className="clickable no-bg-bd text" onClick={clearCompleted}>Clear Completed</button>
        </div>
      </div>

      <div className="hidden-lg container height flex">
        <Navigation id="2" updateFilter={updateFilter} todosFilter={todosFilter} />
      </div>

      <p className="text mg-y">Drag and drop to reorder list</p>

      <Attribution />
    </div>
  );
}

export default App;
