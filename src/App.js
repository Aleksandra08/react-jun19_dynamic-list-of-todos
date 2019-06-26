import React from 'react';
import './App.css';

import todos from './todos';
import { users } from './users';
import TodoList from './TodoList';

function App() {
  return (
    <div className="App">
      <h1>Dynamic list of ToDos</h1>
      <TodoList items={todos} users={users} />
    </div>
  );
}

export default App;
