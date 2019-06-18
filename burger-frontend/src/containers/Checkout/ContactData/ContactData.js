import React from 'react';
import classes from './ContactData.css'
import {connect} from "react-redux";
import {withRouter} from "react-router";
import * as actions from "../../../store/actions";
import Loading from "../../../components/UI/Loading/Loading";
import {createField, validationRules} from './../../../components/UI/Form/Form';
import Form from "../../../components/UI/Form/Form";

const contactData = (props) => {
    const orderFormControls = {
        name: createField(
            'Name',
            'input',
            {type: 'text'},
            {[validationRules.REQUIRED]: true}
        ),
        email: createField(
            'Email',
            'input',
            {type: 'email'},
            {[validationRules.REQUIRED]: true, [validationRules.IS_EMAIL]: true}
        ),
        street: createField(
            'Street',
            'input',
            {type: 'text'},
            {[validationRules.REQUIRED]: true}
        ),
        city: createField(
            'City',
            'input',
            {type: 'text'},
            {[validationRules.REQUIRED]: true}
        ),
        deliveryMethod: createField(
            'Delivery method',
            'select',
            {
                options: [
                    {displayValue: 'Fastest', value: 'fastest'},
                    {displayValue: 'Cheapest', value: 'cheapest'}
                ]
            },
            null,
            'fastest'
        )
    };

    const orderHandler = (formData) => {
        props.onSendOrder({
            customer: {
                name: formData.name,
                email: formData.email,
                street: formData.street,
                city: formData.city,
            },
            deliveryMethod: formData.deliveryMethod,
            ingredients: props.ingredients,
            totalPrice: props.totalPrice
        });
    };

    return (
        <Loading loading={props.loading}>
            <div className={classes.ContactForm}>
                <Form
                    submitText={'Send Order'}
                    controls={orderFormControls}
                    formSubmittedHandler={orderHandler}
                    className={classes.ContactForm}
                />
            </div>
        </Loading>
    );
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.burgerBuilder.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSendOrder: (orderData) => dispatch(actions.sendOrder(orderData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(contactData));