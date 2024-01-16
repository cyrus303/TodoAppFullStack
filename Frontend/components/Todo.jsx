import React, {useState, useEffect} from 'react';
import {
  CardContainer,
  StyledAddButton,
  StyledInput,
  StyledInputContainer,
  StyledTodoItem,
  StyledTodoList,
  TodoContainer,
  StyledBtnDelete,
  StyledImage,
  StyledDivCenter,
} from './styledComponents/TodoStyledComponents';

import deleteLogo from '../src/assets/delete.png';
import noTaskLogo from '../src/assets/noTask.png';

import './checkbox.css';

const Todo = () => {
  const [text, setText] = useState('');
  const [todoItems, setTodoItems] = useState([]);

  const fetchAllTodos = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in local storage');
      }
      const response = await fetch(
        'http://localhost:3000/api/alltodos',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${result.msg}`);
      }

      setTodoItems(result);
    } catch (error) {
      console.error('Error during API request:', error.message);
    }
  };

  const handleAddTodo = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in local storage');
      }
      const response = await fetch('http://localhost:3000/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          completed: false,
          todoText: text,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${result.msg}`);
      }

      const result = await response.json();
      setText('');
      setTodoItems((prev) => [...prev, result]);
    } catch (error) {
      console.error('Error during API request:', error.message);
    }
  };

  const handleCheckbox = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in local storage');
      }
      const response = await fetch(
        'http://localhost:3000/api/updateTodoStatus/' + id,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${result.msg}`);
      }

      const result = await response.json();
      setTodoItems((prev) =>
        prev.map((item) =>
          item._id === result._id
            ? {...item, completed: result.completed}
            : item
        )
      );
    } catch (error) {
      console.error('Error during API request:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in local storage');
      }
      const response = await fetch(
        'http://localhost:3000/api/todo/' + id,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${result.msg}`);
      }

      setTodoItems((prev) => {
        const updatedItems = prev.filter((item) => item._id !== id);
        return updatedItems;
      });
    } catch (error) {
      console.error('Error during API request:', error.message);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in local storage');
      }
      const response = await fetch(
        'http://localhost:3000/api/allTodos',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${result.msg}`);
      }

      setTodoItems([]);
    } catch (error) {
      console.error('Error during API request:', error.message);
    }
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);

  return (
    <TodoContainer>
      <StyledInputContainer>
        <StyledInput
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What do you need to do?"
        />
        <StyledAddButton onClick={handleAddTodo}>Add</StyledAddButton>
      </StyledInputContainer>
      {todoItems.length > 0 ? (
        <CardContainer>
          {todoItems.map((item) => {
            return (
              <StyledTodoList key={item._id}>
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    className="check"
                    id={item._id}
                    defaultChecked={item.completed}
                    onClick={() => {
                      handleCheckbox(item._id);
                    }}
                  />
                  <label htmlFor={item._id} className="label">
                    <svg width="45" height="45" viewBox="0 0 95 95">
                      <rect
                        x="30"
                        y="20"
                        width="50"
                        height="50"
                        stroke="black"
                        fill="none"
                      ></rect>
                      <g transform="translate(0,-952.36222)">
                        <path
                          d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4"
                          stroke="black"
                          strokeWidth="3"
                          fill="none"
                          className="path1"
                        ></path>
                      </g>
                    </svg>
                    <span>{item.todoText}</span>
                  </label>
                </div>
                <img
                  src={deleteLogo}
                  alt="delete icon"
                  onClick={() => {
                    handleDelete(item._id);
                  }}
                />
              </StyledTodoList>
            );
          })}
          {todoItems.length > 1 && (
            <StyledBtnDelete onClick={handleDeleteAll}>
              Delete All
            </StyledBtnDelete>
          )}
        </CardContainer>
      ) : (
        <StyledDivCenter>
          <StyledImage src={noTaskLogo} alt="" />
          <p style={{marginTop: '1rem'}}>
            No todos available at the moment. Enjoy your day!
          </p>
        </StyledDivCenter>
      )}
    </TodoContainer>
  );
};

export default Todo;
