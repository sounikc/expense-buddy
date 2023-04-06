import axios from "axios";

const endpoint = "http://localhost:3000";


export const addExpense = (newExpense)=>{
    console.log('React');
    console.log(newExpense);
    return axios.post(`${endpoint}/expenses/create`, newExpense).then(result => {
        return result;
    }).catch(error => { return error });
    // const dataArray = [newExpense,...data];
    // return dataArray;
}

export const getExpense = ()=>{
    return axios.get(`${endpoint}/expenses`).then(result => {
        return result;
    }).catch(error => { return error });
}