import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import {connect} from "react-redux";

const buildControls = (props) => {

    let signInMessage = null;

    if (!props.isAuthenticated) {
        signInMessage = <p style={{color: 'red'}}>Please sign in before ordering</p>;
    }

    return (
        <div className={classes.BuildControls}>
            <p>Current price: <strong>{props.price.toFixed(2)}$</strong></p>
            {props.controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.name)}
                    removed={() => props.ingredientRemoved(ctrl.name)}
                    isDisabled={props.disabledInfo[ctrl.name]}
                />
            ))}

            {signInMessage}
            <button
                disabled={!(props.purchasable && props.isAuthenticated)}
                className={classes.OrderButton}
                onClick={props.ordered}>ORDER NOW
            </button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
};

export default connect(mapStateToProps)(buildControls);