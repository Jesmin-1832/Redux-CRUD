import { ADD_DATA, DELETE_RECORD, GET_DATA, INIT_DATA, UPDATE_RECORD } from '../Action';


export const adddata = (record) => {
    return {
        type: ADD_DATA,
        payload: record
    }
}

export const getdata = () => {
    return {
        type: GET_DATA
    }
}

export const deleterecord = (id) => {
    return {
        type: DELETE_RECORD,
        payload: id
    }
}

export const updateRecord = (id, newData) => {
    return {
        type: UPDATE_RECORD,
        payload: { id, newData }
    };
};

export const initializeData = (data) => {
    return {
        type: INIT_DATA,
        payload: data
    };
};