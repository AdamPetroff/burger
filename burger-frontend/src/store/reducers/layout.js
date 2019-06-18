import * as actionTypes from './../actions/actionTypes';

const initState = {
    notice: null,
    redirect: null,
    loading: false
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.NOTICE:
            return {
                ...state,
                notice: {
                    noticeType: action.noticeType,
                    text: action.text
                }
            };
        case actionTypes.NOTICE_END:
            return {
                ...state,
                notice: null
            };
        case actionTypes.REDIRECT:
            return {
                ...state,
                redirect: {
                    to: action.to
                }
            };
        case actionTypes.REDIRECT_END:
            return {
                ...state,
                redirect: null
            };
        case actionTypes.LOADING_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.LOADING_END:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;