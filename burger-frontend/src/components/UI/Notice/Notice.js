import React, {useEffect} from 'react';
import classes from './Notice.css';

export const noticeTypes = {
    success: 'Success',
    danger: 'Danger'
};

const notice = (props) => {

    useEffect(() => {
        setTimeout(() => {
            props.end();
        }, props.duration);
    }, []);

    const classesList = [classes.Notice];

    if (props.type) {
        classesList.push(classes[props.type]);
    } else {
        classesList.push(classes.Success);
    }

    return (
        <div
            onClick={props.end}
            style={{animationDuration: props.duration + 'ms'}}
            className={classesList.join(' ')}
        >
            {props.children}
        </div>
    );
};

export default notice;