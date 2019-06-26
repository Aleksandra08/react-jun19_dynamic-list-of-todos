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

export const SORT_ORDER_COMPLETED = 'completed';
export const SORT_ORDER_TITLE = 'title';
export const SORT_ORDER_USER = 'user';

const TodoList = ({ items, onSort }) => (
  <table className="TodoList">
    <thead>
      <tr>
        <th onClick={() => onSort(SORT_ORDER_COMPLETED)}>done</th>
        <th onClick={() => onSort(SORT_ORDER_TITLE)}>title</th>
        <th onClick={() => onSort(SORT_ORDER_USER)}>user</th>
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
