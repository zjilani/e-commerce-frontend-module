import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    // props.type
    let inputClasses = null
    if (props.type ==='InputElement') {
        inputClasses = [classes.InputElement];
    }
    else{
        inputClasses = [classes.InputElement1];

    }
    

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch ( props.elementType ) {
        case ( 'input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                defaultValue={props.value} onChange={props.changed} />;
            break;
        case ( 'textarea') :
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                defaultValue={props.value} onChange={props.changed} />;
            break;
        case ( 'select') :
            inputElement = (
                <select 
                    className={inputClasses.join(' ')} 
                    {...props.elementConfig} 
                    defaultValue={props.value} onChange={props.changed} >
                    {props.elementConfig.options.map(option => (
                        
                        <option key={option.value} defaultValue={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        case ( 'label') :
            inputElement = (
                <p className={classes.label} 
            defaultValue={props.value}><b>{props.defaultValue}</b></p>
            );
            break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                defaultValue={props.value} onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            {/* <label className={classes.Label}>{props.label}</label> */}
            {inputElement}
        </div>
    );
}

export default input;