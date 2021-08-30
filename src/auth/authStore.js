import { createStore } from "redux";


const intialState = {
    "username" : "",
    "detail_movie" : []
}

// Initial state is a default value
function userReducer(state=intialState, action){
    switch(action.type){
        case "SET_USERS": 
            return {...state, username:action.payload}; 
        case "SET_MOVIE":
            return {...state, detail_movie:action.payload};
        default: return state;
    }
}

// Create the store
export default createStore(userReducer);
