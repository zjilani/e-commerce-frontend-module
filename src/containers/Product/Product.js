import React , {Component} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class Product extends Component {
    componentDidMount(){
        this.props.getProduct(this.props.match.params.productId)
    }

    render(){
        return(
            <div>
                
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        product: state.product.data 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProduct : (productId) => dispatch(actions.getProduct(productId))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Product);