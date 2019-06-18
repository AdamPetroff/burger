import React, {useState, useEffect} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import {connect} from "react-redux";
import * as actions from '../../store/actions';
import Loading from "../../components/UI/Loading/Loading";

const burgerBuilder = (props) => {
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);

    useEffect(() => {
        props.onSetInitData();
    }, []);

    const [purchasable, setPurchasable] = useState(false);

    useEffect(() => {
        if (props.ingredients) {
            const sum = Object.entries(props.ingredients).reduce((sum, ingredient) => {
                return sum + ingredient[1]
            }, 0);

            setPurchasable(sum > 0);
            return;
        }

        setPurchasable(false);
    }, [props.ingredients]);

    const orderButtonDisabledInfo = {...props.ingredients};
    for (let key in orderButtonDisabledInfo) {
        orderButtonDisabledInfo[key] = orderButtonDisabledInfo[key] <= 0;
    }

    let burgerBuilder = null;
    let orderSummary = null;

    const purchaseHandler = () => {
        setShowPurchaseModal(true);
    };

    const purchaseCancelHandler = () => {
        setShowPurchaseModal(false);
    };

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
    };

    if (props.ingredients && props.ingredientsData) {

        burgerBuilder = (
            <React.Fragment>
                <Burger ingredients={props.ingredients}/>
                <BuildControls
                    ingredientRemoved={props.onRemoveIngredient}
                    ingredientAdded={props.onAddIngredient}
                    disabledInfo={orderButtonDisabledInfo}
                    price={props.totalPrice}
                    purchasable={purchasable}
                    ordered={purchaseHandler}
                    controls={props.ingredientsData}
                />
            </React.Fragment>
        );

        orderSummary = <OrderSummary
            purchaseContinued={purchaseContinueHandler}
            purchaseCanceled={purchaseCancelHandler}
            price={props.totalPrice}
            ingredients={props.ingredients}/>;
    }

    if (props.error) {
        burgerBuilder = <p>Ingredients can't be loaded!</p>;
    }

    return (
        <Loading loading={props.loading}>
            <Modal modalClosed={purchaseCancelHandler} show={showPurchaseModal}>
                {orderSummary}
            </Modal>
            {burgerBuilder}
        </Loading>
    );

};

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        ingredientsData: state.burgerBuilder.ingredientsData,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.burgerBuilder.loading,
        notice: state.burgerBuilder.notice,
        error: state.burgerBuilder.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredientType) => dispatch(actions.addIngredient(ingredientType)),
        onRemoveIngredient: (ingredientType) => dispatch(actions.removeIngredient(ingredientType)),
        onSetInitData: () => dispatch(actions.setInitData()),
        onInitPurchase: () => dispatch(actions.initPurchase()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(burgerBuilder);
