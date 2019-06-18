import {put} from 'redux-saga/effects'
import * as actions from './../actions';
import * as actionTypes from "../actions/actionTypes";
import api from "../../services/api";
import {noticeTypes} from "../../components/UI/Notice/Notice";

export function* logoutSaga(action) {
    localStorage.removeItem('auth');
    yield put(actions.redirect('/'));
    yield put(actions.notice('You have been logged out successfully'));
    yield put(actions.logOutSucceed());
}

export function* tryAutoAuthSaga(action) {
    let authJson = localStorage.getItem('auth');
    if (authJson) {
        let auth = JSON.parse(authJson);
        yield put({
            type: actionTypes.AUTH_SUCCESS,
            token: auth.token,
            user: auth.user
        });
    }
    yield put(actions.autoAuthAttempted());
}

export function* signInSaga(action) {
    yield put(actions.loadingStart());

    try {
        const response = yield api.post('/auth/sign-in', action.formData);

        yield put(actions.redirect('/'));
        yield put(actions.notice('You have been signed in successfully'));

        localStorage.setItem('auth', JSON.stringify({token: response.data.token, user: response.data.token}));

        yield put({
            type: actionTypes.AUTH_SUCCESS,
            token: response.data.token,
            user: response.data.user
        });

    } catch (e) {
        if(e.response) {
            if (e.response.status=== 401) {
                yield put(actions.notice('Wrong credentials entered!', noticeTypes.danger));
            }
        } else {
            console.log(e);
        }

    } finally {
        yield put(actions.loadingEnd());
    }
}

export function* signUpSaga(action) {
    yield put(actions.loadingStart());

    try {
        const response = yield api.post('/auth/sign-up', action.formData);

        yield put(actions.redirect('/'));
        yield put(actions.notice('You have been signed up and in successfully'));

        localStorage.setItem('auth', JSON.stringify({token: response.data.token, user: response.data.token}));

        yield put({
            type: actionTypes.AUTH_SUCCESS,
            token: response.data.token,
            user: response.data.user
        });

    } catch (e) {
        yield put(actions.notice(e.message, noticeTypes.danger));
    } finally {
        yield put(actions.loadingEnd());
    }
}