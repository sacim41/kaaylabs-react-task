import { createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import RootReducer from "./Reducer/RootReducer";

const reducerList = combineReducers({
    RootReducer,
});
const configureRedux = () => {
    return createStore(reducerList,applyMiddleware(thunk));
}

export default configureRedux