import React , {Component} from 'react';
import { Link} from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './NavigationItems.module.css';
// import cart from '../../../assets/images/cart.png';
import NavigationItem from './NavigationItem/NavigationItem';

class NavigationItems extends Component{
    dataHandler = () => {
        let Data = []
        for(let a in this.props.data){
        let data = [];
        Data.push((  <div className={classes.dropdown}>
                <button className={classes.dropbtn}>{a}</button>
                        <div className={classes.dropdownContent}>
                        {this.props.data[a].forEach(b => {
                             data.push((<Link to={"/products/"+a+"/"+b}>{b}</Link>))
                            })}
                        {data}
                        </div>
                        
            </div>));
        }
        
        return Data;
    }

    render (){
       var Data = this.dataHandler()
        return (
            
            <ul className={classes.NavigationItems}>
                {Data}
                <div className={classes.Blank}></div>
                 {/* <img src={cart}/>  */}
                <NavigationItem link="/cart">CART</NavigationItem>
                <NavigationItem link="/login">LOGIN</NavigationItem> 
                
            </ul>
            
        )
    }
} 
const mapStateToProps = state => {
    return {
        data: state.category.data
    }
}

export default connect(mapStateToProps)(NavigationItems);