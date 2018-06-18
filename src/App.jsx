import React, { Component } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import TodoList from './components/TodoList'
import { connect } from "react-redux";
import { markComplete, addTodo, deleteTodo, clearComplete } from "./actions/actions.js";

export class TodoApp extends Component {
 
  checkboxHandler = id =>  {
    this.props.dispatch(markComplete(id));
  };

  deleteTodo = id =>  {
    this.props.dispatch(deleteTodo(id));
  };

  deleteAllCompleted = () => {
    this.props.dispatch(clearComplete())
  };

  handleSubmit = e => {
    if (e.key === "Enter" && e.target.value !== ''){
    this.props.dispatch(addTodo(e.target.value))
    document.getElementById('new-todo').value = '';
    };
  };

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
          
          />         
			</header>
      <Switch>
        <Route exact path="/todo-part-4/" render={(props) => <TodoList {...props} todos={this.props.todos} 
                                                     checkboxHandler={this.checkboxHandler} 
                                                     deleteTodo={this.deleteTodo} />} />
        <Route path="/todo-part-4/active" render={(props) => <TodoList {...props} todos={this.props.todos.filter(todo => todo.completed === false)} 
                                                                checkboxHandler={this.checkboxHandler} 
                                                                deleteTodo={this.deleteTodo} />} />
        <Route path="/todo-part-4/completed" render={(props) => <TodoList {...props} todos={this.props.todos.filter(todo => todo.completed === true)} 
                                                                checkboxHandler={this.checkboxHandler} 
                                                                deleteTodo={this.deleteTodo} />} />
        <Redirect to="/todo-part-4/" />                                                        
      </Switch>
      <footer className="footer">
      
      <span className="todo-count"><strong>{this.props.todos.filter(todo => todo.completed === false).length}</strong> item(s) left</span>
      <ul className="filters">
        <li>
        <Link to="/todo-part-4/">All</Link>   
        </li>
        <li>
        <Link to="/todo-part-4/active">Active</Link>
        </li>
        <li>
        <Link to="/todo-part-4/completed">Completed</Link>
        </li>
      </ul>
      <button className="clear-completed" onClick={this.deleteAllCompleted}>Clear completed</button>
      </footer>          
      </form>      
		</div>
    );
  }
}

export default connect( state => ({ todos:state.todos,text: state.text }) )(TodoApp);
