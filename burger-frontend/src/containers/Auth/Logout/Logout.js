import {useEffect} from 'react';
import * as actions from './../../../store/actions';
import {connect} from "react-redux";

const logout = (props) => {

    useEffect(() => {
        props.onLogOut();
    }, []);

    return null;
};

const mapActionsToProps = dispatch => {
    return {
        onLogOut: () => dispatch(actions.logOut())
    }
};

export default connect(null, mapActionsToProps)(logout);