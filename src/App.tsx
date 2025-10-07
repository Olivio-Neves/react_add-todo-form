import './App.scss';

// import usersFromServer from './api/users';
// import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types';
import { users } from './api/users';
import { createTodo } from './components/createList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || userId === 0) {
      alert('Please fill in all fields');

      return;
    }

    const newTodo = createTodo(title, userId, todos);

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter a task"
          />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={e => setUserId(Number(e.target.value))}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <span className="error">Please choose a user</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} users={users} />
    </div>
  );
};
