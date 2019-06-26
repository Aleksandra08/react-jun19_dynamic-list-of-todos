import React from 'react';
import './App.css';

import TodoList, {
  SORT_ORDER_COMPLETED,
  SORT_ORDER_TITLE,
  SORT_ORDER_USER
} from './TodoList';
import { getUsers, getTodos } from './api';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortField: SORT_ORDER_TITLE,
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
      [SORT_ORDER_TITLE]: (a, b) => a.title.localeCompare(b.title),
      [SORT_ORDER_USER]: (a, b) => a.user.name.localeCompare(b.user.name),
      [SORT_ORDER_COMPLETED]: (a, b) => a.completed - b.completed,
    };

    const callback = callbackMap[sortField] || callbackMap[SORT_ORDER_TITLE];

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
