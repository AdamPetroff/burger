import * as actionTypes from "./actionTypes";

export const sendOrder = (orderData) => {
    return {
        type: actionTypes.CHECKOUT_SEND_ORDER_INITIATE,
        orderData: orderData
    }
};

export const sendOrderFail = (error) => {
    return {
        type: actionTypes.CHECKOUT_SEND_ORDER_FAIL,
        error: error
    }
};