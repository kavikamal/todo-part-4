export const MARK_COMPLETE = "MARK_COMPLETE";
export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO="DELETE_TODO";
export const CLEAR_COMPLETED="CLEAR_COMPLETED";

export const addTodo = text => ({
  type: 'ADD_TODO',
  text
})

export const markComplete =()=>({   
        type: 'MARK_COMPLETE'  
});

export const deleteTodo=id=>({
        type: 'DELETE_TODO',  
        id  
});

export const clearComplete=()=>({
        type: 'CLEAR_COMPLETE'
});
