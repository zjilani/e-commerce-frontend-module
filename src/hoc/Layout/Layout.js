import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import * as actions from '../../store/actions/index';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }
    componentDidMount(){
        this.props.getCategory()
    }

    sideDrawerToggleHandler = () => {
        this.setState( (prevState) => { 
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render () {
        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler }/>
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getCategory: ()=>dispatch(actions.category())
    };
};


export default connect(null,mapDispatchToProps)(Layout);
