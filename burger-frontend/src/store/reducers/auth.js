import * as actionTypes from './../actions/actionTypes';

const initState = {
    isAuthenticated: false,
    user: null,
    token: null,
    autoAuthAttempted: false
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_LOG_OUT:
            return logOut(state);
        case actionTypes.AUTH_AUTO_AUTH_ATTEMPTED:
            return autoAuthAttempted(state);
        default:
            return state;
    }

};

const authSuccess = (state, action) => {
    return {
        ...state,
        isAuthenticated: true,
        user: action.user,
        token: action.token
    }
};

const logOut = (state) => {
    return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null
    }
};

const autoAuthAttempted = state => {
    return {
        ...state,
        autoAuthAttempted: true
    }
};

export default reducer;