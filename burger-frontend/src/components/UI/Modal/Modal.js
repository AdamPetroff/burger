import React from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
    let modalClasses = [classes.Modal];
    modalClasses.push(props.show ? classes.ModalShow : classes.ModalHide);

    return (
        <React.Fragment>
            <Backdrop dismiss={props.modalClosed} show={props.show}/>
            <div className={modalClasses.join(' ')}>
                {props.children}
            </div>
        </React.Fragment>
    );
};

export default React.memo(modal, (prevProps, nextProps) => {
    return nextProps.show === prevProps.show && nextProps.children === prevProps.children;
});