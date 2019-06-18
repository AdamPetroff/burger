import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    return (
        <React.Fragment>
            <Backdrop dismiss={props.hideSideDrawer} show={props.showSideDrawer}/>
            <div className={[classes.SideDrawer, props.showSideDrawer ? classes.Open : classes.Close].join(' ')}>
                <Logo height="10%"/>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </React.Fragment>
    );
};

export default sideDrawer;