import React from 'react';
import Burger from "../Burger/Burger";
import Button from "../UI/Button/Button";
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Hope it tastes good!</h1>
            <Burger ingredients={props.ingredients}/>
            <Button btnType="Danger" clicked={props.orderCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.orderContinued}>Place order</Button>
        </div>
    );
};

export default checkoutSummary;