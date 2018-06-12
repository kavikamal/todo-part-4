import React, { Component } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import todoList from './todos.json';
import TodoList from './TodoList.jsx'
 
class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: todoList, text: '' };
  }

  handleChange=(e)=> {
    this.setState({ text: e.target.value });
  }

  handleSubmit=(e)=> {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      title: this.state.text,
      completed:false,
      id: this.state.todos.length + 1
    };
    this.setState(prevState => ({
      todos: prevState.todos.concat(newItem), 
      text: ''
    }));
  }

  checkboxHandler= id => evt => {
    const { todos } = this.state;
    this.setState({
      // If the todo we are iterating over has an id that matches the id we baked into the
      // event handler...
      todos: todos.map(todo => todo.id === id ? {
        // make a copy of the todo...
        ...todo,
        // but change completed to be the opposite of what it was originally;
        completed: !todo.completed
        // otherwise, return the original todo, untouched
      } : todo)
    });
  }

  deleteTodo = id => evt => {
    const { todos } = this.state;
    this.setState({ 
      todos: todos.filter(todo => todo.id !== id )   
    });
  }

  deleteAllCompleted =(e)=> {
    const { todos } = this.state;
    this.setState({ 
      todos: todos.filter(todo => todo.completed === false)   
    });
  }

  render() {
    return (  
      <div className="todoapp">
      <form onSubmit={this.handleSubmit}>
			<header className="header">
				<h1>todos</h1>  
	      <input
            id="new-todo" className="new-todo" 
            placeholder="What needs to be done?" autoFocus
            onChange={this.handleChange}
            value={this.state.text}
          />         
			</header>
      <Switch>
        <Route exact path="/todo-part-3/" render={(props) => <TodoList {...props} todos={this.state.todos} 
                                                     checkboxHandler={this.checkboxHandler} 
                                                     deleteTodo={this.deleteTodo} />} />
        <Route path="/todo-part-3/active" render={(props) => <TodoList {...props} todos={this.state.todos.filter(todo => todo.completed === false)} 
                                                                checkboxHandler={this.checkboxHandler} 
                                                                deleteTodo={this.deleteTodo} />} />
        <Route path="/todo-part-3/completed" render={(props) => <TodoList {...props} todos={this.state.todos.filter(todo => todo.completed === true)} 
                                                                checkboxHandler={this.checkboxHandler} 
                                                                deleteTodo={this.deleteTodo} />} />
        <Redirect to="/todo-part-3/" />                                                        
      </Switch>
      <footer className="footer">
      
      <span className="todo-count"><strong>{this.state.todos.filter(todo => todo.completed === false).length}</strong> item(s) left</span>
      <ul className="filters">
        <li>
        <Link to="/todo-part-3/">All</Link>   
        </li>
        <li>
        <Link to="/todo-part-3/active">Active</Link>
        </li>
        <li>
        <Link to="/todo-part-3/completed">Completed</Link>
        </li>
      </ul>
      <button className="clear-completed" onClick={this.deleteAllCompleted}>Clear completed</button>
      </footer>          
      </form>
      
		</div>
    );
  }
}

export default TodoApp;
