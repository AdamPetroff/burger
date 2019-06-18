import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';
import {connect} from "react-redux";

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem to="/">Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem to="/orders">Orders</NavigationItem> : null}
        {props.isAuthenticated ? <NavigationItem to="/auth/logout">Logout</NavigationItem> :
            <NavigationItem to="/auth">Authenticate</NavigationItem>}
    </ul>
);

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
};

export default connect(mapStateToProps)(navigationItems);