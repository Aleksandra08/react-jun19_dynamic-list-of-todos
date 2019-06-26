import React from 'react';
import './App.css';

import TodoList from './TodoList';
import { getUsers, getTodos } from './api';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      todos: [],
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

  render() {
    const { todos, isLoaded } = this.state;

    return (
      <div className="App">
        <h1>
          Dynamic list of ToDos
          {todos.length}
        </h1>

        { isLoaded ? (
          <TodoList items={todos} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export default App;
