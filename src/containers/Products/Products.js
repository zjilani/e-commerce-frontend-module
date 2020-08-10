import React , {Component} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import classes from './Products.module.css';
import StarRatingComponent from 'react-star-rating-component';

class Products extends Component {

    componentDidMount() {
        console.log(this.props.match.params)
        this.props.getProducts(this.props.match.params)
    }
    
    shouldComponentUpdate(nextProps,nextState){
        if(this.props.match.params !== nextProps.match.params){
            window.location.reload(false)
        }
        return true;
        
    }
    featureHandler = () => {

    }
    
    productHandler = () => {
        let products = []
        for(let i in this.props.products){
            let a = (
                <div className={classes.Individual}>
                    <img  className={classes.pic} src={"https://ecommerce12.s3.ap-south-1.amazonaws.com/"+this.props.products[i].thumbnails[0]} alt={this.props.products[i].thumbnails[0]}/>
                    <p className={classes.Set}>{this.props.products[i].productName}</p>
                    <p className={classes.Set}>
                    <StarRatingComponent 
                        name= "Rating"
                        editing={false}
                        starCount={5}
                        value={this.props.products[i].productRating}
                    />
                    </p>
                </div>
            );
            products.push(a)
        }
        return products
    }
    

    render() {
        var features = this.featureHandler()
        var products = this.productHandler()
        return (
            <div className={classes.Products}>
                {features}
                {products}
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        products: state.products.products
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProducts : (params) => dispatch(actions.getProducts(params))
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(Products);