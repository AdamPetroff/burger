import * as actionTypes from './actionTypes';

export const signUp = (formData) => {
    return {
        type: actionTypes.AUTH_SIGN_UP_INITIATE,
        formData: formData
    }
};

export const signIn = (formData) => {
    return {
        type: actionTypes.AUTH_SIGN_IN_INITIATE,
        formData: formData
    };
};

export const logOut = () => {
    return {
        type: actionTypes.AUTH_LOG_OUT_INITIATE
    };
};

export const logOutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOG_OUT
    };
};

export const tryAutoAuth = () => {
    return {
        type: actionTypes.AUTH_TRY_AUTO_AUTH
    };
};

export const autoAuthAttempted = () => {
    return {
        type: actionTypes.AUTH_AUTO_AUTH_ATTEMPTED
    };
};