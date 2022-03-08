// // Single Reducer: 

// import { createStore } from "redux";
// import { productsReducer } from "./ProductsState";

// const store = createStore(productsReducer);

// export default store;

// // Redux three operations using single reducer: 
// // 1. Get State: store.getState().products
// // 2. Subscribe: store.subscribe(...)
// // 3. Dispatch: store.dispatch(...)


// -------------------------------------------------------------------------------------------------


// Multiple Reducers: 
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { vacationsReducer } from "./VacationsState";

const reducers = combineReducers({ vacationsState: vacationsReducer, authState: authReducer });
const store = createStore(reducers, composeWithDevTools());

export default store;

// Redux three operations using multiple reducer:
// 1. Get State: store.getState().productsState.products / store.getState().catsState.cats
// 2. Subscribe: store.subscribe(...)
// 3. Dispatch: store.dispatch(...)

