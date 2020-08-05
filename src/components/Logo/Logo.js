import React from 'react';

import pic4 from '../../assets/images/pic4.png';
import classes from './Logo.module.css';

const logo = (props)=> (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={pic4} alt="colossal"/>
    </div>
);

export default logo;