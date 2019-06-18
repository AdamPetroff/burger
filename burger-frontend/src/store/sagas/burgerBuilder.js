import api from "../../services/api";
import * as actionTypes from "../actions/actionTypes";
import {put} from 'redux-saga/effects';
import *  as actions from './../actions';

export function* setInitDataSaga() {
    try{
        const response = yield api.get('/resource/ingredients');

        yield put({
            type: actionTypes.BURGER_BUILDER_SET_INIT_DATA,
            ingredientsData: response.data
        });
    } catch (e) {
        console.log('kokot');
        yield put(actions.setInitDataFailed());
    }
}

export function* initPurchaseSaga() {
    yield put(actions.redirect('/checkout'));
}