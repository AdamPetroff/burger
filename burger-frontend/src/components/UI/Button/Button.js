import React from 'react';
import classes from './Button.css';

const button = (props) => {
    let btnType = props.btnType;
    if (btnType === undefined) {
        btnType = 'Success';
    }

    return (
        <button
            className={[classes.Button, classes[btnType]].join(' ')}
            onClick={props.clicked}>{props.children}
        </button>
    );

};

export default button;