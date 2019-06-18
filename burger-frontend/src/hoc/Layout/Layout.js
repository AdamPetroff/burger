import React, {useState, useEffect} from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Notice from "../../components/UI/Notice/Notice";
import * as actions from './../../store/actions';
import {connect} from 'react-redux';
import {withRouter} from "react-router";

const layout = (props) => {

    let [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    };

    const sideDrawerToggledHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    };

    useEffect(() => {
        if (props.redirect) {
            props.onRedirectEnd();
            props.history.push(props.redirect.to);
        }
    });

    return (
        <React.Fragment>
            {props.notice ?
                <Notice
                    end={props.onNoticeEnd}
                    type={props.notice.noticeType}
                    duration={3000}
                >
                    {props.notice.text}
                </Notice> : null}
            <Toolbar toggledSideDrawer={sideDrawerToggledHandler}/>
            <SideDrawer hideSideDrawer={sideDrawerClosedHandler} showSideDrawer={showSideDrawer}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    );

};

const mapStateToProps = (state) => {
    return {
        notice: state.layout.notice,
        redirect: state.layout.redirect
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        onNoticeEnd: () => dispatch(actions.noticeEnd()),
        onRedirectEnd: () => dispatch(actions.redirectEnd())
    }
};

export default connect(mapStateToProps, mapActionsToProps)(withRouter(layout));