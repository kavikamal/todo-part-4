import React, { Component } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import TodoList from './components/TodoList'
import { connect } from "react-redux";
import { markComplete, addTodo, deleteTodo, clearComplete } from "./actions.js";

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

  // handleChange=(e)=> {
  //   this.props.text= e.target.value ;
  // }

  handleSubmit = e => {
    e.preventDefault();
    console.log(document.getElementById('new-todo').value);
    
     
    this.props.dispatch(addTodo(document.getElementById('new-todo').value))
    document.getElementById('new-todo').value = '';
    
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
            // onChange={this.handleChange}
          
          />         
			</header>
      <Switch>
        <Route exact path="/" render={(props) => <TodoList {...props} todos={this.props.todos} 
                                                     checkboxHandler={this.checkboxHandler} 
                                                     deleteTodo={this.deleteTodo} />} />
        <Route path="/active" render={(props) => <TodoList {...props} todos={this.props.todos.filter(todo => todo.completed === false)} 
                                                                checkboxHandler={this.checkboxHandler} 
                                                                deleteTodo={this.deleteTodo} />} />
        <Route path="/completed" render={(props) => <TodoList {...props} todos={this.props.todos.filter(todo => todo.completed === true)} 
                                                                checkboxHandler={this.checkboxHandler} 
                                                                deleteTodo={this.deleteTodo} />} />
        <Redirect to="/" />                                                        
      </Switch>
      <footer className="footer">
      
      <span className="todo-count"><strong>{this.props.todos.filter(todo => todo.completed === false).length}</strong> item(s) left</span>
      <ul className="filters">
        <li>
        <Link to="/">All</Link>   
        </li>
        <li>
        <Link to="/active">Active</Link>
        </li>
        <li>
        <Link to="/completed">Completed</Link>
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
