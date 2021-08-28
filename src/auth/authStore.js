import { createStore } from "redux";


const intialState = {
    "userDetails" : []
}

// Initial state is a default value
function userReducer(state=intialState, action){
    switch(action.type){
        case "SET_USERS": 
            return {...state, userDetails:action.payload}; 
        default: return state;
    }
}
8
// Create the store
export default createStore(userReducer);
