import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import pic4 from '../../../assets/images/pic4.png';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer , classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer , classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div>
                    <img className={classes.Logo} src ={pic4} alt="Colossal" />
                </div>
                <nav>
                    <NavigationItems  isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;