import React from 'react';

const User = ({ user }) => (
  <span>{user.name}</span>
);

const TodoItem = ({ item }) => (
  <tr>
    <td>
      <input type="checkbox" checked={item.completed} />
    </td>

    <td>
      {item.title}
    </td>

    <td>
      <User user={item.user} />
    </td>
  </tr>
);

const TodoList = ({ items }) => (
  <table className="TodoList">
    <thead>
      <tr>
        <th>done</th>
        <th>title</th>
        <th>user</th>
      </tr>
    </thead>
    <tbody>
      {items.map(item => (
        <TodoItem key={item.id} item={item} />
      ))}
    </tbody>
  </table>
);

export default TodoList;
