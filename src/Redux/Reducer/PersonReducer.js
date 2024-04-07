// import { ADD_DATA, DELETE_RECORD, GET_DATA, UPDATE_RECORD } from "../Action"

// const initialValue = {
//     person: []
// };

// const PersonReducer = (state = initialValue, action) => {
//     switch (action.type) {
//         case ADD_DATA:
//             return { ...state, person: [...state.person, action.payload] };
//         case DELETE_RECORD:
//             return {
//             }
//         case UPDATE_RECORD:
//             return {
//             }
//         case GET_DATA:
//             return state;
//         default:
//             return state;
//     }
// }

// export default PersonReducer;

import { ADD_DATA, DELETE_RECORD, GET_DATA, INIT_DATA, UPDATE_RECORD } from "../Action";

const initialValue = {
    person: []
};

const PersonReducer = (state = initialValue, action) => {
    switch (action.type) {
        case INIT_DATA:
            return {
                ...state,
                person: action.payload
            };
        case ADD_DATA:
            return { ...state, person: [...state.person, action.payload] };
        case DELETE_RECORD:
            return {
                ...state,
                person: state.person.filter(item => item.id !== action.payload)
            };
        case UPDATE_RECORD:
            return {
                ...state,
                person: state.person.map(item =>
                    item.id === action.payload.id ? action.payload.newData : item
                )
            };
        case GET_DATA:
            return state;
        default:
            return state;
    }
};

export default PersonReducer;
