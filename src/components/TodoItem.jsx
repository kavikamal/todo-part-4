import React, { Component } from 'react';

class TodoItem extends Component{

    render(){
      return(
        <React.Fragment>
            <li className={this.props.completed? "completed":""}>
                  <div className="view">
                  <input id={this.props.id} 
                         className="toggle" 
                         type="checkbox" 
                         checked={this.props.completed} 
                         onChange={this.props.checkboxHandler(this.props.id)} />
                  <label>{this.props.title}</label>
                  <button className="destroy" onClick={this.props.deleteTodo(this.props.id)} ></button>
                </div>
              </li>
        </React.Fragment>
      );
    }
  }

  export default TodoItem;  