import React, { Component } from 'react';
import TodoItem from './TodoItem.jsx'

class TodoList extends Component {
    render() {
      return (			
        <div className="main">
        <ul className="todo-list" >
          {this.props.todos.map(todo => (
            <TodoItem completed={todo.completed} 
                      title={todo.title} 
                      id= {todo.id} 
                      checkboxHandler={this.props.checkboxHandler} 
                      deleteTodo={this.props.deleteTodo}>
            </TodoItem> 
          ))}
        </ul>
        </div>
      );
    }
  }

export default TodoList;  