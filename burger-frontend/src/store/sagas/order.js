import * as actions from "../actions";
import api from "../../services/api";
import * as actionTypes from "../actions/actionTypes";
import {put} from 'redux-saga/effects';

export function* loadOrdersSaga() {
    yield put(actions.loadingStart());

    const response = yield api.get('/resource/order');

    yield put({
        type: actionTypes.ORDERS_LOAD_ORDERS,
        orders: response.data
    });

    yield put(actions.loadingEnd());
}