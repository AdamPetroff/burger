import * as actionTypes from '../actions/actionTypes';

const initState = {
    totalPrice: 4,
    ingredients: null,
    ingredientPrices: null,
    ingredientsData: null,
    error: false
};

const reducer = (state = initState, action) => {

    if (action.type === actionTypes.BURGER_BUILDER_ADD_INGREDIENT) {
        return {
            ...state,
            totalPrice: state.totalPrice + state.ingredientPrices[action.ingredientType],
            ingredients: {
                ...state.ingredients,
                [action.ingredientType]: state.ingredients[action.ingredientType] + 1
            }
        };
    }

    if (action.type === actionTypes.BURGER_BUILDER_REMOVE_INGREDIENT) {
        return {
            ...state,
            totalPrice: state.totalPrice - state.ingredientPrices[action.ingredientType],
            ingredients: {
                ...state.ingredients,
                [action.ingredientType]: state.ingredients[action.ingredientType] > 0 ? state.ingredients[action.ingredientType] - 1 : state.ingredients[action.ingredientType]
            }
        };
    }

    if (action.type === actionTypes.BURGER_BUILDER_SET_INIT_DATA) {
        let ingredientPrices = {};
        let initIngredients = {};

        let totalPrice = initState.totalPrice;

        action.ingredientsData.forEach((ingredient) => {
            ingredientPrices[ingredient.name] = ingredient.price;
            initIngredients[ingredient.name] = ingredient.initNumber;

            totalPrice += ingredient.price * ingredient.initNumber;
        });

        return {
            ...state,
            ingredients: initIngredients,
            ingredientPrices: ingredientPrices,
            ingredientsData: action.ingredientsData,
            totalPrice: totalPrice,
            loading: false,
            error: false
        }
    }

    if(action.type === actionTypes.BURGER_BUILDER_SET_INIT_DATA_FAILED) {
        return {
            ...state,
            error: true
        };
    }

    return state;
};

export default reducer;