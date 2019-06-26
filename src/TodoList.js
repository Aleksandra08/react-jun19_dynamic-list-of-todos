import React from 'react';

const TodoItem = ({ item }) => (
  <li>
    <b>{item.user.name}</b>
    {item.title}
  </li>
);

const TodoList = ({ items }) => (
  <div className="TodoList">
    <ul>
      {items.map(item => (
        <TodoItem key={item.id} item={item} />
      ))}
    </ul>
  </div>
);

export default TodoList;
