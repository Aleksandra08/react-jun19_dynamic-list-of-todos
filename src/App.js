import React from 'react';
import './App.css';

import TodoList from './TodoList';
import { getUsers, getTodos } from './api';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortField: 'title',
      isLoaded: false,
      todos: [],
    };

    this.handleSort = (sortField) => {
      this.setState({ sortField });
    };
  }

  async componentDidMount() {
    const todos = await getTodos();
    const users = await getUsers();

    const items = this.getTodosWithUsers(todos, users);

    setTimeout(() => {
      this.setState({
        todos: items,
        isLoaded: true,
      });
    }, 2000);
  }

  // eslint-disable-next-line class-methods-use-this
  getTodosWithUsers(todos, users) {
    return todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));
  }

  sortTodos(todos, sortField) {
    const callbackMap = {
      title: (a, b) => a.title.localeCompare(b.title),
      user: (a, b) => a.user.name.localeCompare(b.user.name),
      completed: (a, b) => a.completed - b.completed,
    };

    const callback = callbackMap[sortField] || callbackMap.title;

    return todos.sort(callback);
  }

  render() {
    const { todos, isLoaded, sortField } = this.state;
    const visibleTodos = this.sortTodos(todos, sortField);

    return (
      <div className="App">
        <h1>
          Dynamic list of ToDos
          {todos.length}
        </h1>

        { isLoaded ? (
          <TodoList
            items={visibleTodos}
            onSort={this.handleSort}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export default App;
