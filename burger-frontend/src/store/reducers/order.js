import * as actionTypes from "../actions/actionTypes";

const initState = {
    orders: []
};

const reducer = (state = initState, action) => {

    switch (action.type) {
        case actionTypes.ORDERS_LOAD_ORDERS:
            return {
                ...state,
                orders: action.orders
            };
        default:
            return state;
    }
};

export default reducer;