import * as actionTypes from './actionTypes';

export const notice = (text, noticeType = 'Success') => {
    return {
        type: actionTypes.NOTICE,
        text: text,
        noticeType: noticeType
    };
};

export const noticeEnd = () => {
    return {
        type: actionTypes.NOTICE_END,
    };
};

export const loadingStart = () => {
    return {
        type: actionTypes.LOADING_START
    }
};

export const loadingEnd = () => {
    return {
        type: actionTypes.LOADING_END
    }
};

export const redirect = (to) => {
    return {
        type: actionTypes.REDIRECT,
        to: to
    }
};

export const redirectEnd = () => {
    return {
        type: actionTypes.REDIRECT_END
    }
};