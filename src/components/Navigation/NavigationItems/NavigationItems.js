import React from 'react';
import { Link} from 'react-router-dom';

import classes from './NavigationItems.module.css';
// import cart from '../../../assets/images/cart.png';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
            <div className={classes.dropdown}>
                <span className={classes.dropbtn}>ELECTRONICS</span>
                    <div className={classes.dropdownContent}>
                        <Link to="/signup">Air Conditioner</Link>
                        <Link to="/otp">B</Link>
                    </div>
            </div>
            
            <div className={classes.Blank}></div>
            {/* <img src={cart}/> */}

            
            <NavigationItem link="/cart">CART</NavigationItem>
            {!props.isAuthenticated 
                    ? <NavigationItem link="/login">LOGIN</NavigationItem>
                    : <NavigationItem link="/logout">LOGOUT</NavigationItem>}
    </ul>
    
);

export default navigationItems;