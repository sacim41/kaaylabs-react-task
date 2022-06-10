import {GET_TABLE_DATA} from "../Action/RootAction";
const initialState= {
    dataList: [],
};

const RootReducer = (state = initialState, action)=>{
    switch(action.type){
        case GET_TABLE_DATA:
            return {...state, dataList: action.payload};
            default:
                return { ...state};
    }
}

export default RootReducer;