import * as actions from "../actions";
import api from "../../services/api";
import * as actionTypes from "../actions/actionTypes";
import {put} from 'redux-saga/effects';

export function* sendOrderSaga(action) {
    yield put(actions.loadingStart());

    try {
        const response = yield api.post('/resource/order', action.orderData);
        yield put({
            type: actionTypes.CHECKOUT_SEND_ORDER_SUCCESS,
            orderData: response.data
        });

        yield put(actions.redirect('/'));
        yield put(actions.notice('Your order has been sent successfully!'));

    } catch (e) {
        yield put(actions.sendOrderFail(e));
    }
}