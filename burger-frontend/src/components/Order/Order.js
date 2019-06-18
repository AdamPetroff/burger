import React from 'react';
import classes from './Order.css';

const order = (props) => {

    const ingredients = Object.entries(props.ingredients).map((ingredient) => {
        return <span key={ingredient[0]} style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 3px',
            padding: '0 3px',
            border: '1px solid grey',

        }}
        >{ingredient[0] + '(' + ingredient[1] + ')'}</span>;
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <b>{props.price.toFixed(2)}$</b></p>
        </div>
    );
};

export default order;