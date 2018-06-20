
import { MARK_COMPLETE, ADD_TODO, DELETE_TODO, CLEAR_COMPLETED } from './actions.js'
import todoList from './todos.json';

const initialState = {
    todos: todoList,
    text: ''
}

export default (state = initialState, action) => {
    switch(action.type) {
            case MARK_COMPLETE:
                return Object.assign({}, state, {
                    todos: state.todos.map(
                        todo =>
                        todo.id === action.payload
                            ? {
                                ...todo,
                                completed: !todo.completed
                            }
                            : todo
                    )
                });
                
            case ADD_TODO:
                return Object.assign({}, state, {
                                    todos: [...state.todos, {
                                            "userId": 1,
                                            "id": state.todos.length + 1,
                                            "title": action.payload,
                                            "completed": false
                                        }
                                        ]
                                    });
                
            case DELETE_TODO: 
                return Object.assign({}, state, {
                    todos: state.todos.filter(todo => todo.id !== action.payload)
                });    
            case CLEAR_COMPLETED:
                return Object.assign({}, state, {
                    todos: state.todos.filter(todo => !todo.completed)
                })
            
            default:
            return Object.assign({},state);
    }
}    

