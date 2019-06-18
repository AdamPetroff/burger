import {takeEvery} from 'redux-saga/effects';
import * as auth from './auth';
import * as burgerBuilder from './burgerBuilder';
import * as checkout from './checkout';
import * as order from './order';
import * as actionTypes from './../actions/actionTypes';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_LOG_OUT_INITIATE, auth.logoutSaga);
    yield takeEvery(actionTypes.AUTH_TRY_AUTO_AUTH, auth.tryAutoAuthSaga);
    yield takeEvery(actionTypes.AUTH_SIGN_IN_INITIATE, auth.signInSaga);
    yield takeEvery(actionTypes.AUTH_SIGN_UP_INITIATE, auth.signUpSaga);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.BURGER_BUILDER_SET_INIT_DATA_INITIATE, burgerBuilder.setInitDataSaga);
    yield takeEvery(actionTypes.INIT_PURCHASE, burgerBuilder.initPurchaseSaga);
}

export function* watchCheckout() {
    yield takeEvery(actionTypes.CHECKOUT_SEND_ORDER_INITIATE, checkout.sendOrderSaga);
}

export function* watchOrder() {
    yield takeEvery(actionTypes.ORDERS_LOAD_ORDERS_INITIATE, order.loadOrdersSaga);
}