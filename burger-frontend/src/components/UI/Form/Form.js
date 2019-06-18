import React, {useState, useEffect} from 'react';
import Input from "../Input/Input";
import classes from "./Form.css";
import Button from "../Button/Button";

export const validationRules = {
    REQUIRED: 'REQUIRED',
    IS_EMAIL: 'IS_EMAIL',
    MIN_LENGTH: 'MIN_LENGTH'
};

export const createField = (label, elementType = 'input', elementConfig = null, elementValidationRules = null, value = '') => {

    if (elementType === 'select' && value === '' && elementConfig && elementConfig.options) {
        value = elementConfig.options[0].value;
    }

    let validation = null;

    if (elementValidationRules) {
        validation = {
            isValid: true,
            rules: elementValidationRules,
            errorMessages: null
        };
    }

    return {
        label: label,
        elementType: elementType,
        elementConfig: elementConfig ? elementConfig : {
            type: 'text'
        },
        value: value,
        validation: validation
    };
};

const form = (props) => {

    const [controls, setControls] = useState({});

    useEffect(() => {
        setControls(props.controls);
    }, []);


    let form = [];
    for (let field in controls) {
        let formElement = controls[field];
        form.push(<Input
            label={formElement.label}
            key={field}
            invalid={formElement.validation ? !formElement.validation.isValid : null}
            changed={(event) => formChangedHandler(event, field)}
            value={formElement.value}
            elementType={formElement.elementType}
            elementConfig={formElement.elementConfig}
            errorMessage={formElement.validation ? formElement.validation.errorMessages : null}
        />)
    }

    const formChangedHandler = (event, fieldIdentifier) => {
        const updatedForm = {...controls};
        const updatedField = {...updatedForm[fieldIdentifier]};

        if (controls[fieldIdentifier].validation) {
            [updatedField.validation.isValid, updatedField.validation.errorMessages] = validateField(
                event.target.value,
                controls[fieldIdentifier].validation.rules
            );

        }

        updatedField.value = event.target.value;
        updatedForm[fieldIdentifier] = updatedField;

        setControls(updatedForm);
    };

    const formSubmittedHandler = (event) => {
        event.preventDefault();

        const newFields = {};

        for (let [fieldName, field] of Object.entries(controls)) {
            if (field.validation) {
                let [isValid, errorMessages] = validateField(field.value, field.validation.rules);

                if (!isValid) {
                    newFields[fieldName] = {
                        ...field,
                        validation: {
                            ...field.validation,
                            isValid: false,
                            errorMessages: errorMessages
                        }
                    }
                }
            }
        }

        if (Object.entries(newFields).length !== 0) {
            setControls({
                ...controls,
                ...newFields
            });

            return;
        }

        const formData = {};
        Object.entries(controls).forEach((control) => {
            formData[control[0]] = control[1].value
        });

        props.formSubmittedHandler(formData);
    };

    const validateField = (value, rules) => {
        let isValid = true;
        let errorMessages = [];

        if (rules[validationRules.REQUIRED]) {
            let ruleFulfilled = value.trim() !== '';
            isValid = ruleFulfilled && isValid;

            if (!ruleFulfilled) {
                errorMessages.push('Field must not be empty.');
            }
        }

        if (rules[validationRules.MIN_LENGTH]) {
            let ruleFulfilled = value.length >= rules[validationRules.MIN_LENGTH];
            isValid = ruleFulfilled && isValid;

            if (!ruleFulfilled) {
                errorMessages.push(`Value must be at least ${rules[validationRules.MIN_LENGTH]} characters long.`);
            }
        }

        if (rules[validationRules.IS_EMAIL]) {
            let ruleFulfilled = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(value);
            isValid = ruleFulfilled && isValid;

            if (!ruleFulfilled) {
                errorMessages.push('Value must be an email.');
            }
        }

        return [isValid, errorMessages];
    };

    return (
        <form className={classes.Form}>
            {form}
            <Button clicked={formSubmittedHandler}
                    btnType="Success">{props.submitText ? props.submitText : 'Submit'}</Button>
            {props.children}
        </form>
    );
};

export default form;