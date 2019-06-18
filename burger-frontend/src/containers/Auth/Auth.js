import React, {useState, useEffect} from 'react';
import Button from "../../components/UI/Button/Button";
import classes from './Auth.css';
import {connect} from "react-redux";
import Loading from "../../components/UI/Loading/Loading";
import * as actions from './../../store/actions';
import Form, {createField, validationRules} from './../../components/UI/Form/Form';

const auth = (props) => {

    const [isSignUp, setIsSignUp] = useState(false);

    useEffect(() => {
        if (props.isAuthenticated) {
            props.onIsAlreadyAuthenticated();
        }
    });

    const controls = {
        email: createField(
            'Email',
            'input',
            {type: 'email'},
            {[validationRules.REQUIRED]: true, [validationRules.IS_EMAIL]: true}),
        password: createField(
            'Password',
            'input',
            {type: 'password'},
            {[validationRules.REQUIRED]: true, [validationRules.MIN_LENGTH]: 6})
    };

    const switchSignUp = () => {
        setIsSignUp(!isSignUp);
    };

    const formSubmittedHandler = (formData) => {
        if (isSignUp) {
            props.onSignUp(formData);
        } else {
            props.onSignIn(formData);
        }
    };

    return (
        <Loading loading={props.loading}>
            <div className={classes.Auth}>
                <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
                <Form controls={controls} formSubmittedHandler={formSubmittedHandler}/>
                <Button clicked={switchSignUp} btnType="Success">
                    Switch to {isSignUp ? 'Sign In' : 'Sign Up'}
                </Button>
            </div>
        </Loading>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.layout.loading,
        isAuthenticated: state.auth.isAuthenticated
    };
};

const mapActionsToProps = dispatch => {
    return {
        onSignUp: (formData) => dispatch(actions.signUp(formData)),
        onSignIn: (formData) => dispatch(actions.signIn(formData)),
        onIsAlreadyAuthenticated: () => dispatch(actions.redirect('/'))
    };
};

export default connect(mapStateToProps, mapActionsToProps)(auth);