
import React, { Component } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { addTodo } from './actions.js'
import { withRouter } from 'react-router-dom';

class TodoApp extends Component {

  handleChange = (e) => {
    this.setState({ text: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.text.length>0) {
        this.props.dispatch(addTodo(this.state.text));
        let newTodo = document.getElementById("newTodo");
        newTodo.value = "";
        this.setState({ text: "" })
    }
  }

  render() {
    const { handleSubmit, handleChange } = this;

    return (
      <React.Fragment>

        <div className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <form onSubmit={handleSubmit}>
              <input id="newTodo" placeholder="What needs to be done?" className="new-todo" onChange={handleChange}
                autoFocus
              />
            </form>
          </header>
          <Switch>
            <Route exact path="/" render={props => <TodoList {...props} filter="all" />} />
            <Route path="/active" render={props => <TodoList {...props} filter="active" />} />
            <Route path="/completed" render={props => <TodoList {...props} filter="completed" />} />
          </Switch>
        </div>

      </React.Fragment>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    text: state.text
  }
}
export default withRouter(connect(mapStateToProps)(TodoApp));



