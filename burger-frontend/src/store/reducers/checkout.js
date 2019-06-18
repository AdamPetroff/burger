import * as actionTypes from '../actions/actionTypes';

const initState = {
    purchased: false
};

const reducer = (state = initState, action) => {
    if (action.type === actionTypes.INIT_PURCHASE) {
        return {
            ...state,
            purchased: false
        };
    }

    if (action.type === actionTypes.CHECKOUT_SEND_ORDER_SUCCESS) {
        return {
            ...state,
            purchased: true
        };
    }

    if (action.type === actionTypes.CHECKOUT_SEND_ORDER_FAIL) {
        return {
            ...state,
            purchased: false
        };
    }

    return state;
};

export default reducer;