import React from 'react';
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";
import * as actions from './../../store/actions';

const checkout = (props) =>  {

    if(!props.ingredients) {
        props.onIngredientsNotLoaded();
        return null;
    }

    const orderContinued = () => {
        props.history.replace('/checkout/contact-data');
    };

    const orderCancelled = () => {
        props.history.goBack();
    };

    return (
        <React.Fragment>
            <CheckoutSummary
                orderContinued={orderContinued}
                orderCancelled={orderCancelled}
                ingredients={props.ingredients}
            />;
            <Route path="/checkout/contact-data" component={ContactData}/>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients
    }
};

const mapActionsToProps = dispatch => {
    return {
        onIngredientsNotLoaded: () => dispatch(actions.redirect('/'))
    }
};

export default connect(mapStateToProps, mapActionsToProps)(checkout);