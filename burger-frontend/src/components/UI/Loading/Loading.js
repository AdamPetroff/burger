import React from 'react';
import Spinner from './Spinner/Spinner';

const loading = (props) => {
    return (
        <div>
            {props.loading ? <Spinner/> : props.children}
        </div>
    );
};

export default loading;