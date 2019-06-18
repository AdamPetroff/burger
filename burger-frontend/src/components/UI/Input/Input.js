import React from 'react';
import classes from './Input.css';

const input = (props) => {

    let element = '';

    const inputClasses = [classes.InputElement];

    if (props.invalid) {
        inputClasses.push(classes.Invalid);
    }

    const inputClassesText = inputClasses.join(' ');

    switch (props['elementType']) {
        case 'input':
            element = <input onChange={props.changed} {...props.elementConfig} className={inputClassesText}/>;
            break;
        case 'select':

            const options = props.elementConfig.options.map((option) => {
                return <option key={option.value} value={option.value}>{option.displayValue}</option>
            });

            element = (
                <select onChange={props.changed} className={inputClassesText}>
                    {options}
                </select>
            );
            break;
        default:
            return null;
    }

    let errorMessages = null;

    if(props.errorMessage) {
        if(Array.isArray(props.errorMessage)) {
            errorMessages = props.errorMessage.map((errorMessage, i) => {
                return <span key={i} style={{color: 'red'}}>{errorMessage}</span>
            });
        } else {
            errorMessages = <span style={{color: 'red'}}>{errorMessages}</span>
        }
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {element} {errorMessages}
        </div>
    );
};

export default input;