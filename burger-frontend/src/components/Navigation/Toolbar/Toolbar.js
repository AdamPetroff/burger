import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Button from '../../UI/Button/Button';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.ToggleMenu}>
            <Button clicked={props.toggledSideDrawer}>MENU</Button>
        </div>
        <Logo height="80%"/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;