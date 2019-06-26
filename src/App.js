import React from 'react';
import './App.css';

import todosFromServer from './todos';
import usersFromServer from './users';
import TodoList from './TodoList';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
    };
  }


  componentDidMount() {
    this.setState({
      todos: this.getTodosWithUsers(todosFromServer, usersFromServer),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getTodosWithUsers(todos, users) {
    return todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <h1>
          Dynamic list of ToDos
          {todos.length}
        </h1>

        <TodoList items={todos} />
      </div>
    );
  }
}

export default App;
