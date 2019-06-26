import React from 'react';

const TodoList = ({ items }) => (
  <div className="TodoList">
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.title}
        </li>
      ))}
    </ul>
  </div>
);

export default TodoList;
