import React, {useEffect} from 'react';
import Order from "../../components/Order/Order";
import {connect} from "react-redux";
import * as actions from "../../store/actions";

const orders = (props) => {

    useEffect(() => {
        props.onComponentMounted();
    }, []);

    if (props.orders) {
        return props.orders.map((order) => {
            return <Order key={order['_id']} ingredients={order.ingredients} price={order.totalPrice}/>
        });
    }

    return <p>You don't have any orders.</p>
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders
    }
};

const mapActionsToProps = dispatch => {
    return {
        onComponentMounted: () => dispatch(actions.loadOrders())
    }
};

export default connect(mapStateToProps, mapActionsToProps)(orders);