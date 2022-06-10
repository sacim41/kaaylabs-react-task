import axios from "axios";

export const GET_TABLE_DATA = "GET_TABLE_DATA";

export const getTableData = () => {
    return(dispatch)=>{
      axios.get("https://api.punkapi.com/v2/beers").then((result)=>{
        dispatch({
            type: GET_TABLE_DATA,
            payload: result.data
        })
      }).catch((error)=>{
        console.log(error)
      })
    }
}