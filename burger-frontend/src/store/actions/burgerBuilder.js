import * as actionTypes from './actionTypes';

export const setInitData = () => {
    return {
        type: actionTypes.BURGER_BUILDER_SET_INIT_DATA_INITIATE
    }
};

export const setInitDataFailed = () => {
    return {
        type: actionTypes.BURGER_BUILDER_SET_INIT_DATA_FAILED
    };
};

export const addIngredient = (ingredientType) => {
    return {
        type: actionTypes.BURGER_BUILDER_ADD_INGREDIENT,
        ingredientType: ingredientType
    }
};

export const removeIngredient = (ingredientType) => {
    return {
        type: actionTypes.BURGER_BUILDER_REMOVE_INGREDIENT,
        ingredientType: ingredientType
    }
};

export const initPurchase = () => {
    return {
        type: actionTypes.INIT_PURCHASE
    };
};